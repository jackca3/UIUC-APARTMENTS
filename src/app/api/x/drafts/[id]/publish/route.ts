import { NextRequest, NextResponse } from "next/server";
import { getXServerSession } from "@/lib/server/x-session";
import { createSupabaseAdminClient } from "@/lib/server/supabase-admin";
import { createXPost, getUsableAccessToken, getXConnection } from "@/lib/server/x-api";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getXServerSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { id } = await context.params;
    const supabase = createSupabaseAdminClient();

    const { data: draft, error: draftError } = await supabase
      .from("x_post_drafts")
      .select("*")
      .eq("id", id)
      .eq("owner_email", session.email)
      .maybeSingle();

    if (draftError) {
      throw new Error(draftError.message);
    }

    if (!draft) {
      return NextResponse.json({ error: "Draft not found." }, { status: 404 });
    }

    if (draft.status === "published") {
      return NextResponse.json({ error: "Draft is already published." }, { status: 400 });
    }

    const connection = await getXConnection(session.email);
    if (!connection) {
      return NextResponse.json({ error: "Connect your X account first." }, { status: 400 });
    }

    try {
      const accessToken = await getUsableAccessToken(connection);
      const xResponse = await createXPost(accessToken, draft.text);

      const { data: updatedDraft, error: updateError } = await supabase
        .from("x_post_drafts")
        .update({
          status: "published",
          published_post_id: xResponse.data.id,
          last_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", draft.id)
        .select("*")
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      return NextResponse.json({ draft: updatedDraft, xPostId: xResponse.data.id });
    } catch (publishError) {
      const message =
        publishError instanceof Error ? publishError.message : "Publishing failed.";

      await supabase
        .from("x_post_drafts")
        .update({
          status: "failed",
          last_error: message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", draft.id);

      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (error) {
    console.error("[Apt.ly] Draft publish error:", error);
    return NextResponse.json({ error: "Failed to publish draft." }, { status: 500 });
  }
}
