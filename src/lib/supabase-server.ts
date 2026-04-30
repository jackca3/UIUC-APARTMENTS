import http from "node:http";
import https from "node:https";

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Custom Node http/https fetch shim
// ---------------------------------------------------------------------------
// The default undici-based fetch used by @supabase/supabase-js times out in
// this environment (OneDrive / Windows). We replicate the same working shim
// that is already proven in src/lib/social/bluesky.ts.
// ---------------------------------------------------------------------------

const NODE_FETCH_TIMEOUT_MS = 15000;

function toNodeHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}

function toResponseHeaders(rawHeaders: string[]): Headers {
    const responseHeaders = new Headers();
    for (let i = 0; i < rawHeaders.length; i += 2) {
        const key = rawHeaders[i];
        const value = rawHeaders[i + 1];
        if (key && value !== undefined) {
            responseHeaders.append(key, value);
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
            timeout: NODE_FETCH_TIMEOUT_MS,
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
                void performNodeFetch(new Request(nextUrl, request), redirectCount + 1).then(resolve, reject);
                res.resume();
                return;
            }

            const chunks: Buffer[] = [];
            res.on("data", chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
            res.on("end", () => {
                resolve(new Response(Buffer.concat(chunks), {
                    status: statusCode,
                    statusText: res.statusMessage,
                    headers: toResponseHeaders(res.rawHeaders ?? []),
                }));
            });
        });

        const abortHandler = () => {
            req.destroy(new Error("The request was aborted."));
        };

        request.signal?.addEventListener("abort", abortHandler, { once: true });

        req.on("timeout", () => {
            req.destroy(new Error("Supabase request timed out."));
        });

        req.on("error", error => {
            request.signal?.removeEventListener("abort", abortHandler);
            reject(error);
        });

        req.on("close", () => {
            request.signal?.removeEventListener("abort", abortHandler);
        });

        if (body) {
            req.write(body);
        }

        req.end();
    });
}

async function supabaseFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const request = new Request(input, init);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), NODE_FETCH_TIMEOUT_MS);

    try {
        return await performNodeFetch(new Request(request, { signal: controller.signal }));
    } finally {
        clearTimeout(timeout);
    }
}

// ---------------------------------------------------------------------------
// Supabase client factory
// ---------------------------------------------------------------------------

export function createServerSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        throw new Error("Supabase environment variables are not configured.");
    }

    return createClient(url, anonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: {
            fetch: supabaseFetch as typeof fetch,
        },
    });
}
