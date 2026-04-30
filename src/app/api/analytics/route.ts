import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/server/supabase-admin";

const allowedEvents = new Set([
  "review_cta_clicked",
  "review_form_opened",
  "review_submit_succeeded",
  "review_submit_failed",
  "add_building_submit_succeeded",
  "add_building_submit_failed",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventName = typeof body.eventName === "string" ? body.eventName : "";

    if (!allowedEvents.has(eventName)) {
      return NextResponse.json({ ok: false, error: "Invalid event name." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("launch_events").insert({
      event_name: eventName,
      page_path: typeof body.pagePath === "string" ? body.pagePath : null,
      user_id: typeof body.userId === "string" ? body.userId : null,
      apartment_id: typeof body.apartmentId === "string" ? body.apartmentId : null,
      apartment_slug: typeof body.apartmentSlug === "string" ? body.apartmentSlug : null,
      metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : {},
    });

    if (error) {
      console.error("[analytics] Insert failed:", error.message);
      return NextResponse.json({ ok: false, error: "Analytics insert failed." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics] Unexpected error:", error);
    return NextResponse.json({ ok: false, error: "Unexpected analytics error." }, { status: 500 });
  }
}
