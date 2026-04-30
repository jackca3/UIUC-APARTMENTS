export type LaunchEventName =
  | "review_cta_clicked"
  | "review_form_opened"
  | "review_submit_succeeded"
  | "review_submit_failed"
  | "add_building_submit_succeeded"
  | "add_building_submit_failed";

export type LaunchAnalyticsSummary = {
  available: boolean;
  message?: string;
  windowDays: number;
  totals: {
    reviewCtaClicks: number;
    reviewFormOpens: number;
    reviewSubmitSucceeded: number;
    reviewSubmitFailed: number;
    addBuildingSubmitSucceeded: number;
    addBuildingSubmitFailed: number;
  };
  conversionRates: {
    ctaToSubmitPercent: number | null;
    formToSubmitPercent: number | null;
  };
  topApartmentInterest: Array<{
    apartmentSlug: string;
    count: number;
  }>;
  recentFailures: Array<{
    eventName: string;
    reason: string;
    createdAt: string;
    apartmentSlug: string | null;
  }>;
};

type LaunchEventPayload = {
  eventName: LaunchEventName;
  pagePath?: string;
  userId?: string | null;
  apartmentId?: string | null;
  apartmentSlug?: string | null;
  metadata?: Record<string, unknown>;
};

export async function trackLaunchEvent(payload: LaunchEventPayload) {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        ...payload,
        pagePath: payload.pagePath ?? window.location.pathname,
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] Failed to track launch event", error);
    }
  }
}

export async function getLaunchAnalyticsSummary(): Promise<LaunchAnalyticsSummary> {
  const response = await fetch("/api/analytics/summary", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load launch analytics.");
  }

  return response.json();
}
