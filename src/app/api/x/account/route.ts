import { NextResponse } from "next/server";
import { getXServerSession } from "@/lib/server/x-session";
import {
  deleteXConnection,
  getXConfig,
  getXConnection,
  getXMissingConfig,
} from "@/lib/server/x-api";

export async function GET() {
  try {
    const session = await getXServerSession();
    const config = getXConfig();
    const missingConfig = getXMissingConfig();

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        configReady: config.ready,
        missingConfig,
        account: null,
      });
    }

    if (missingConfig.length > 0) {
      return NextResponse.json({
        authenticated: true,
        email: session.email,
        configReady: false,
        missingConfig,
        account: null,
      });
    }

    const connection = await getXConnection(session.email);

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      configReady: config.ready,
      missingConfig,
      account: connection
        ? {
            xUsername: connection.x_username,
            xName: connection.x_name,
            xUserId: connection.x_user_id,
            profileImageUrl: connection.x_profile_image_url,
            scopes: connection.scopes ?? [],
            connectedAt: connection.created_at,
          }
        : null,
    });
  } catch (error) {
    console.error("[Apt.ly] X account status error:", error);
    return NextResponse.json(
      { error: "Failed to load X account status." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getXServerSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    await deleteXConnection(session.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Apt.ly] X account disconnect error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect X account." },
      { status: 500 }
    );
  }
}
