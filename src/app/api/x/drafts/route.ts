import { NextRequest, NextResponse } from "next/server";
import { getXServerSession } from "@/lib/server/x-session";
import { createSupabaseAdminClient } from "@/lib/server/supabase-admin";
import { X_POST_MAX_LENGTH } from "@/lib/server/x-api";

export async function GET() {
  try {
    const session = await getXServerSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("x_post_drafts")
      .select("*")
      .eq("owner_email", session.email)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ drafts: data ?? [] });
  } catch (error) {
    console.error("[Apt.ly] Draft list error:", error);
    return NextResponse.json({ error: "Failed to load drafts." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getXServerSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { text, scheduledFor } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Draft text is required." }, { status: 400 });
    }

    const normalizedText = text.trim();
    if (!normalizedText) {
      return NextResponse.json({ error: "Draft text cannot be empty." }, { status: 400 });
    }

    if (normalizedText.length > X_POST_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Posts must be ${X_POST_MAX_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    let scheduledForIso: string | null = null;
    if (typeof scheduledFor === "string" && scheduledFor.trim()) {
      const parsedDate = new Date(scheduledFor);
      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Scheduled time is invalid." }, { status: 400 });
      }
      scheduledForIso = parsedDate.toISOString();
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("x_post_drafts")
      .insert({
        owner_email: session.email,
        text: normalizedText,
        status: "draft",
        scheduled_for: scheduledForIso,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ draft: data });
  } catch (error) {
    console.error("[Apt.ly] Draft create error:", error);
    return NextResponse.json({ error: "Failed to save draft." }, { status: 500 });
  }
}
