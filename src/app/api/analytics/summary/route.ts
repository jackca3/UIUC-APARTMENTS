import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/server/supabase-admin";

const WINDOW_DAYS = 30;

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("launch_events")
      .select("event_name, created_at, apartment_slug, metadata")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      if (error.message.toLowerCase().includes("launch_events")) {
        return NextResponse.json({
          available: false,
          message: "Run supabase/launch_analytics.sql in Supabase to activate launch funnel reporting.",
          windowDays: WINDOW_DAYS,
          totals: {
            reviewCtaClicks: 0,
            reviewFormOpens: 0,
            reviewSubmitSucceeded: 0,
            reviewSubmitFailed: 0,
            addBuildingSubmitSucceeded: 0,
            addBuildingSubmitFailed: 0,
          },
          conversionRates: {
            ctaToSubmitPercent: null,
            formToSubmitPercent: null,
          },
          topApartmentInterest: [],
          recentFailures: [],
        });
      }

      throw error;
    }

    const totals = {
      reviewCtaClicks: 0,
      reviewFormOpens: 0,
      reviewSubmitSucceeded: 0,
      reviewSubmitFailed: 0,
      addBuildingSubmitSucceeded: 0,
      addBuildingSubmitFailed: 0,
    };

    const apartmentInterest = new Map<string, number>();
    const recentFailures: Array<{
      eventName: string;
      reason: string;
      createdAt: string;
      apartmentSlug: string | null;
    }> = [];

    for (const event of data ?? []) {
      switch (event.event_name) {
        case "review_cta_clicked":
          totals.reviewCtaClicks += 1;
          break;
        case "review_form_opened":
          totals.reviewFormOpens += 1;
          break;
        case "review_submit_succeeded":
          totals.reviewSubmitSucceeded += 1;
          break;
        case "review_submit_failed":
          totals.reviewSubmitFailed += 1;
          break;
        case "add_building_submit_succeeded":
          totals.addBuildingSubmitSucceeded += 1;
          break;
        case "add_building_submit_failed":
          totals.addBuildingSubmitFailed += 1;
          break;
      }

      if (event.apartment_slug) {
        apartmentInterest.set(
          event.apartment_slug,
          (apartmentInterest.get(event.apartment_slug) ?? 0) + 1
        );
      }

      if (
        (event.event_name === "review_submit_failed" || event.event_name === "add_building_submit_failed") &&
        recentFailures.length < 6
      ) {
        recentFailures.push({
          eventName: event.event_name,
          reason:
            typeof event.metadata?.reason === "string"
              ? event.metadata.reason
              : "Unknown failure reason",
          createdAt: event.created_at,
          apartmentSlug: event.apartment_slug ?? null,
        });
      }
    }

    return NextResponse.json({
      available: true,
      windowDays: WINDOW_DAYS,
      totals,
      conversionRates: {
        ctaToSubmitPercent: totals.reviewCtaClicks
          ? Math.round((totals.reviewSubmitSucceeded / totals.reviewCtaClicks) * 100)
          : null,
        formToSubmitPercent: totals.reviewFormOpens
          ? Math.round((totals.reviewSubmitSucceeded / totals.reviewFormOpens) * 100)
          : null,
      },
      topApartmentInterest: Array.from(apartmentInterest.entries())
        .map(([apartmentSlug, count]) => ({ apartmentSlug, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      recentFailures,
    });
  } catch (error) {
    console.error("[analytics-summary] Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected analytics summary error." },
      { status: 500 }
    );
  }
}
