import { NextRequest, NextResponse } from "next/server";

import { publishToBluesky } from "@/lib/social/bluesky";

function isAuthorized(request: NextRequest): boolean {
    const secret = process.env.SOCIAL_CRON_SECRET;
    if (!secret) {
        throw new Error("Missing SOCIAL_CRON_SECRET.");
    }

    return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
    try {
        if (!isAuthorized(request)) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        const body = await request.json();
        const text = typeof body?.text === "string" ? body.text : "";
        const url = typeof body?.url === "string" ? body.url : undefined;
        const langs = Array.isArray(body?.langs)
            ? body.langs.filter((lang: unknown): lang is string => typeof lang === "string" && lang.trim().length > 0)
            : undefined;

        if (!text.trim()) {
            return NextResponse.json({ error: "Text is required." }, { status: 400 });
        }

        const result = await publishToBluesky({ text, url, langs });

        return NextResponse.json({
            ok: true,
            uri: result.uri,
            cid: result.cid,
        });
    } catch (error) {
        console.error("[Bluesky] Publish failed:", error);

        const message = error instanceof Error ? error.message : "Failed to publish post.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
