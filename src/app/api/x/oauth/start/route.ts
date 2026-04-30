import { NextResponse } from "next/server";
import { createCodeChallenge, getAppBaseUrl, getXConfig } from "@/lib/server/x-api";
import {
  createRandomState,
  createXOAuthSession,
  getXServerSession,
} from "@/lib/server/x-session";

export async function GET() {
  const baseUrl = getAppBaseUrl();

  try {
    const session = await getXServerSession();
    if (!session) {
      return NextResponse.redirect(new URL("/content-calendar?xError=auth", baseUrl));
    }

    const { clientId, redirectUri, scopes, ready } = getXConfig();
    if (!ready || !clientId) {
      return NextResponse.redirect(new URL("/content-calendar?xError=config", baseUrl));
    }

    const state = createRandomState();
    const codeVerifier = createRandomState(32);
    const codeChallenge = createCodeChallenge(codeVerifier);

    await createXOAuthSession(session.email, state, codeVerifier);

    const authUrl = new URL("https://twitter.com/i/oauth2/authorize");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes.join(" "));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("[Apt.ly] X OAuth start error:", error);
    return NextResponse.json({ error: "Failed to start X OAuth flow." }, { status: 500 });
  }
}
