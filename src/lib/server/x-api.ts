import { createHash } from "crypto";
import { decryptSecret, encryptSecret } from "./x-crypto";
import { createSupabaseAdminClient } from "./supabase-admin";

const X_AUTHORIZE_URL = "https://twitter.com/i/oauth2/authorize";
const X_TOKEN_URL = "https://api.x.com/2/oauth2/token";
const X_ME_URL = "https://api.x.com/2/users/me?user.fields=id,name,username,profile_image_url";
const X_CREATE_POST_URL = "https://api.x.com/2/tweets";

export const X_POST_MAX_LENGTH = 280;
export const X_SCOPES = ["tweet.read", "tweet.write", "users.read", "offline.access"] as const;

export type XConnectionRecord = {
  id: string;
  owner_email: string;
  x_user_id: string;
  x_username: string;
  x_name: string | null;
  x_profile_image_url: string | null;
  scopes: string[] | null;
  encrypted_access_token: string;
  encrypted_refresh_token: string | null;
  token_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export function getAppBaseUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    process.env.VERCEL_URL;

  if (!configured && process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  if (!configured) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL (or APP_URL) for X OAuth redirects.");
  }

  return configured.startsWith("http") ? configured : `https://${configured}`;
}

export function getXConfig() {
  const clientId = process.env.X_CLIENT_ID;
  const clientSecret = process.env.X_CLIENT_SECRET;
  const redirectUri = `${getAppBaseUrl()}/api/x/oauth/callback`;

  return {
    clientId,
    clientSecret,
    redirectUri,
    ready: Boolean(clientId && clientSecret),
    scopes: [...X_SCOPES],
  };
}

export function getXMissingConfig() {
  const missing: string[] = [];
  if (!process.env.X_CLIENT_ID) missing.push("X_CLIENT_ID");
  if (!process.env.X_CLIENT_SECRET) missing.push("X_CLIENT_SECRET");
  if (!process.env.NEXT_PUBLIC_APP_URL && !process.env.APP_URL && !process.env.VERCEL_URL) {
    missing.push("NEXT_PUBLIC_APP_URL");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!process.env.X_TOKEN_ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
    missing.push("X_TOKEN_ENCRYPTION_KEY");
  }
  if (
    !process.env.X_SESSION_SECRET &&
    !process.env.EMAIL_VERIFICATION_SECRET &&
    !process.env.NEXTAUTH_SECRET &&
    !process.env.SMTP_PASS &&
    process.env.NODE_ENV === "production"
  ) {
    missing.push("X_SESSION_SECRET");
  }

  return missing;
}

export function createCodeChallenge(codeVerifier: string) {
  return createHash("sha256").update(codeVerifier).digest("base64url");
}

function getBasicAuthHeader(clientId: string, clientSecret: string) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

export async function exchangeCodeForTokens(code: string, codeVerifier: string) {
  const { clientId, clientSecret, redirectUri, ready } = getXConfig();

  if (!ready || !clientId || !clientSecret) {
    throw new Error("X OAuth is not configured.");
  }

  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(X_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${getBasicAuthHeader(clientId, clientSecret)}`,
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`X token exchange failed: ${errorText}`);
  }

  return response.json() as Promise<{
    token_type: string;
    expires_in?: number;
    access_token: string;
    scope?: string;
    refresh_token?: string;
  }>;
}

export async function fetchXUser(accessToken: string) {
  const response = await fetch(X_ME_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch X account info: ${errorText}`);
  }

  const payload = await response.json();
  return payload.data as {
    id: string;
    username: string;
    name?: string;
    profile_image_url?: string;
  };
}

export async function upsertXConnection(params: {
  ownerEmail: string;
  xUser: { id: string; username: string; name?: string; profile_image_url?: string };
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  scopes?: string[];
}) {
  const supabase = createSupabaseAdminClient();
  const tokenExpiresAt = params.expiresIn
    ? new Date(Date.now() + params.expiresIn * 1000).toISOString()
    : null;

  const { error } = await supabase.from("x_account_connections").upsert(
    {
      owner_email: params.ownerEmail.toLowerCase(),
      x_user_id: params.xUser.id,
      x_username: params.xUser.username,
      x_name: params.xUser.name ?? null,
      x_profile_image_url: params.xUser.profile_image_url ?? null,
      scopes: params.scopes ?? [...X_SCOPES],
      encrypted_access_token: encryptSecret(params.accessToken),
      encrypted_refresh_token: params.refreshToken ? encryptSecret(params.refreshToken) : null,
      token_expires_at: tokenExpiresAt,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "owner_email",
    }
  );

  if (error) {
    throw new Error(`Failed to save X connection: ${error.message}`);
  }
}

export async function getXConnection(ownerEmail: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("x_account_connections")
    .select("*")
    .eq("owner_email", ownerEmail.toLowerCase())
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load X connection: ${error.message}`);
  }

  return data as XConnectionRecord | null;
}

export async function deleteXConnection(ownerEmail: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("x_account_connections")
    .delete()
    .eq("owner_email", ownerEmail.toLowerCase());

  if (error) {
    throw new Error(`Failed to disconnect X account: ${error.message}`);
  }
}

async function refreshAccessToken(connection: XConnectionRecord) {
  const { clientId, clientSecret, ready } = getXConfig();
  if (!ready || !clientId || !clientSecret || !connection.encrypted_refresh_token) {
    throw new Error("X refresh token flow is not configured.");
  }

  const refreshToken = decryptSecret(connection.encrypted_refresh_token);
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const response = await fetch(X_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${getBasicAuthHeader(clientId, clientSecret)}`,
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh X token: ${errorText}`);
  }

  const refreshed = (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
  };

  await upsertXConnection({
    ownerEmail: connection.owner_email,
    xUser: {
      id: connection.x_user_id,
      username: connection.x_username,
      name: connection.x_name ?? undefined,
      profile_image_url: connection.x_profile_image_url ?? undefined,
    },
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token || refreshToken,
    expiresIn: refreshed.expires_in,
    scopes: refreshed.scope?.split(" ") ?? connection.scopes ?? [...X_SCOPES],
  });

  return refreshed.access_token;
}

export async function getUsableAccessToken(connection: XConnectionRecord) {
  if (!connection.token_expires_at) {
    return decryptSecret(connection.encrypted_access_token);
  }

  const expiresAt = new Date(connection.token_expires_at).getTime();
  const withinRefreshWindow = Date.now() >= expiresAt - 60_000;

  if (!withinRefreshWindow) {
    return decryptSecret(connection.encrypted_access_token);
  }

  return refreshAccessToken(connection);
}

export async function createXPost(accessToken: string, text: string) {
  const response = await fetch(X_CREATE_POST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to publish post to X: ${errorText}`);
  }

  return response.json() as Promise<{ data: { id: string; text: string } }>;
}
