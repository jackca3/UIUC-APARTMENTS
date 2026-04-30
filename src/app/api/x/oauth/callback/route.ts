import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForTokens,
  fetchXUser,
  getAppBaseUrl,
  upsertXConnection,
} from "@/lib/server/x-api";
import { consumeXOAuthSession } from "@/lib/server/x-session";

export async function GET(req: NextRequest) {
  const baseUrl = getAppBaseUrl();

  try {
    const url = new URL(req.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    const oauthError = url.searchParams.get("error");

    if (oauthError) {
      return NextResponse.redirect(
        new URL(`/content-calendar?xError=${encodeURIComponent(oauthError)}`, baseUrl)
      );
    }

    if (!state || !code) {
      return NextResponse.redirect(new URL("/content-calendar?xError=callback", baseUrl));
    }

    const oauthSession = await consumeXOAuthSession(state);
    if (!oauthSession) {
      return NextResponse.redirect(new URL("/content-calendar?xError=state", baseUrl));
    }

    const tokenPayload = await exchangeCodeForTokens(code, oauthSession.codeVerifier);
    const xUser = await fetchXUser(tokenPayload.access_token);

    await upsertXConnection({
      ownerEmail: oauthSession.email,
      xUser,
      accessToken: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token,
      expiresIn: tokenPayload.expires_in,
      scopes: tokenPayload.scope?.split(" "),
    });

    return NextResponse.redirect(new URL("/content-calendar?xConnected=1", baseUrl));
  } catch (error) {
    console.error("[Apt.ly] X OAuth callback error:", error);
    return NextResponse.redirect(new URL("/content-calendar?xError=exchange", baseUrl));
  }
}
