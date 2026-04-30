import { NextResponse } from "next/server";

export async function GET() {
    const identifier = process.env.BLUESKY_IDENTIFIER;
    const password = process.env.BLUESKY_APP_PASSWORD;
    const service = process.env.BLUESKY_SERVICE_URL;
    
    return NextResponse.json({
        identifier,
        passwordLength: password?.length,
        passwordHas$: password?.includes("$"),
        service,
    });
}
