import http from "node:http";
import https from "node:https";

import { BskyAgent, RichText } from "@atproto/api";

const DEFAULT_BLUESKY_SERVICE_URL = "https://bsky.social";
const BLUESKY_POST_GRAPHEME_LIMIT = 300;
const BLUESKY_POST_COLLECTION = "app.bsky.feed.post";
const BLUESKY_FETCH_TIMEOUT_MS = 30000;
const BLUESKY_FETCH_RETRIES = 1;

export type PublishToBlueskyInput = {
    text: string;
    url?: string;
    langs?: string[];
    rkey?: string;
};

type BlueskyCredentials = {
    service: string;
    identifier: string;
    password: string;
};

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toNodeHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};

    headers.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

function toResponseHeaders(
    headers: http.IncomingHttpHeaders,
    rawHeaders: string[] | undefined,
): Headers {
    const responseHeaders = new Headers();

    if (rawHeaders?.length) {
        for (let index = 0; index < rawHeaders.length; index += 2) {
            const key = rawHeaders[index];
            const value = rawHeaders[index + 1];
            if (key && value !== undefined) {
                responseHeaders.append(key, value);
            }
        }

        return responseHeaders;
    }

    for (const [key, value] of Object.entries(headers)) {
        if (Array.isArray(value)) {
            for (const entry of value) {
                responseHeaders.append(key, entry);
            }
        } else if (value !== undefined) {
            responseHeaders.set(key, value);
        }
    }

    return responseHeaders;
}

async function performNodeFetch(request: Request, redirectCount = 0): Promise<Response> {
    const url = new URL(request.url);
    const transport = url.protocol === "https:" ? https : http;
    const body = request.method === "GET" || request.method === "HEAD"
        ? undefined
        : Buffer.from(await request.arrayBuffer());

    return new Promise<Response>((resolve, reject) => {
        const req = transport.request(url, {
            method: request.method,
            headers: {
                ...toNodeHeaders(request.headers),
                connection: "close",
            },
            timeout: BLUESKY_FETCH_TIMEOUT_MS,
        }, res => {
            const statusCode = res.statusCode ?? 500;

            if (
                statusCode >= 300 &&
                statusCode < 400 &&
                res.headers.location &&
                redirectCount < 5 &&
                request.redirect !== "manual"
            ) {
                const nextUrl = new URL(res.headers.location, url);
                const redirectedRequest = new Request(nextUrl, request);
                void performNodeFetch(redirectedRequest, redirectCount + 1).then(resolve, reject);
                res.resume();
                return;
            }

            const chunks: Buffer[] = [];
            res.on("data", chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
            res.on("end", () => {
                resolve(new Response(Buffer.concat(chunks), {
                    status: statusCode,
                    statusText: res.statusMessage,
                    headers: toResponseHeaders(res.headers, res.rawHeaders),
                }));
            });
        });

        const abortHandler = () => {
            req.destroy(new Error("The request was aborted."));
        };

        request.signal.addEventListener("abort", abortHandler, { once: true });

        req.on("timeout", () => {
            req.destroy(new Error("The request timed out."));
        });

        req.on("error", error => {
            request.signal.removeEventListener("abort", abortHandler);
            reject(error);
        });

        req.on("close", () => {
            request.signal.removeEventListener("abort", abortHandler);
        });

        if (body) {
            req.write(body);
        }

        req.end();
    });
}

async function blueskyFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= BLUESKY_FETCH_RETRIES; attempt += 1) {
        const request = new Request(input, init);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), BLUESKY_FETCH_TIMEOUT_MS);

        try {
            return await performNodeFetch(new Request(request, {
                signal: controller.signal,
            }));
        } catch (error) {
            lastError = error;

            if (attempt === BLUESKY_FETCH_RETRIES) {
                throw error;
            }

            await sleep(1000 * (attempt + 1));
        } finally {
            clearTimeout(timeout);
        }
    }

    throw lastError instanceof Error ? lastError : new Error("Bluesky request failed.");
}

function getBlueskyCredentials(): BlueskyCredentials {
    const service = process.env.BLUESKY_SERVICE_URL || DEFAULT_BLUESKY_SERVICE_URL;
    const identifier = process.env.BLUESKY_IDENTIFIER;
    const password = process.env.BLUESKY_APP_PASSWORD;

    if (!identifier || !password) {
        throw new Error("Missing Bluesky credentials. Set BLUESKY_IDENTIFIER and BLUESKY_APP_PASSWORD.");
    }

    return { service, identifier, password };
}

function getOptionalSiteUrl(): string | null {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!siteUrl) return null;

    return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function normalizeUrl(url?: string): string | undefined {
    const trimmed = url?.trim();
    if (!trimmed) return undefined;

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    const siteUrl = getOptionalSiteUrl();
    if (!siteUrl) {
        throw new Error("Relative URLs require NEXT_PUBLIC_SITE_URL to be configured.");
    }

    return `${siteUrl}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

function buildPostText(text: string, url?: string): string {
    const trimmedText = text.trim();

    if (!trimmedText) {
        throw new Error("Bluesky post text cannot be empty.");
    }

    return url ? `${trimmedText}\n\n${url}` : trimmedText;
}

async function createRichText(agent: BskyAgent, text: string): Promise<RichText> {
    const richText = new RichText({ text });
    await richText.detectFacets(agent);

    if (richText.graphemeLength > BLUESKY_POST_GRAPHEME_LIMIT) {
        throw new Error(`Bluesky posts must be ${BLUESKY_POST_GRAPHEME_LIMIT} characters or fewer.`);
    }

    return richText;
}

export async function publishToBluesky(input: PublishToBlueskyInput) {
    const credentials = getBlueskyCredentials();
    const agent = new BskyAgent({ service: credentials.service, fetch: blueskyFetch });

    await agent.login({
        identifier: credentials.identifier,
        password: credentials.password,
    });

    const normalizedUrl = normalizeUrl(input.url);
    const postText = buildPostText(input.text, normalizedUrl);
    const richText = await createRichText(agent, postText);

    const record = {
        $type: BLUESKY_POST_COLLECTION,
        text: richText.text,
        facets: richText.facets,
        langs: input.langs?.length ? input.langs : ["en-US"],
        createdAt: new Date().toISOString(),
    } as const;

    if (input.rkey) {
        if (!agent.session?.did) {
            throw new Error("Bluesky session did not include a DID.");
        }

        const response = await agent.com.atproto.repo.putRecord({
            repo: agent.session.did,
            collection: BLUESKY_POST_COLLECTION,
            rkey: input.rkey,
            record,
        });

        return response.data;
    }

    return agent.post(record);
}
