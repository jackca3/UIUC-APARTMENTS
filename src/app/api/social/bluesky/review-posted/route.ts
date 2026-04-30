import { NextRequest, NextResponse } from "next/server";
import { TID } from "@atproto/common-web";

import { publishToBluesky } from "@/lib/social/bluesky";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type ReviewRow = {
    id: string;
    apartment_id: string;
    user_id: string;
    management_rating: number;
    maintenance_rating: number;
    value_rating: number;
    noise_rating: number;
    monthly_rent_paid: number | null;
    written_review: string;
    created_at: string;
};

type ApartmentRow = {
    id: string;
    name: string;
    slug: string;
    management_company: string | null;
};

function collapseWhitespace(value: string): string {
    return value.replace(/\s+/g, " ").trim();
}

function trimExcerpt(value: string, maxLength: number): string {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function buildReviewRkey(review: Pick<ReviewRow, "id" | "created_at">): string {
    const createdAt = Date.parse(review.created_at);
    const timestamp = Number.isFinite(createdAt) ? createdAt * 1000 : Date.now() * 1000;
    const clockId = Array.from(review.id).reduce((total, char) => total + char.charCodeAt(0), 0) % 32;

    return TID.fromTime(timestamp, clockId).toString();
}

function buildReviewPostText(review: ReviewRow, apartment: ApartmentRow): string {
    const heading = `New Apt.ly review for ${apartment.name}`;
    const ratings = `Mgmt ${review.management_rating}/5 | Maint ${review.maintenance_rating}/5 | Value ${review.value_rating}/5 | Noise ${review.noise_rating}/5`;
    const rent = review.monthly_rent_paid !== null ? `Rent: $${Math.round(review.monthly_rent_paid)}/mo` : null;
    const manager = apartment.management_company ? `Manager: ${apartment.management_company}` : null;
    const excerpt = trimExcerpt(collapseWhitespace(review.written_review).replace(/^["']+|["']+$/g, ""), 80);

    return [
        heading,
        ratings,
        rent,
        manager,
        excerpt ? `"${excerpt}"` : null,
    ]
        .filter((section): section is string => Boolean(section))
        .join("\n");
}

export async function POST(request: NextRequest) {
    try {
        const { reviewId } = await request.json();

        if (!reviewId || typeof reviewId !== "string") {
            return NextResponse.json({ error: "Review ID is required." }, { status: 400 });
        }

        const supabase = createServerSupabaseClient();

        const { data: reviewData, error: reviewError } = await supabase
            .from("reviews")
            .select("id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, created_at")
            .eq("id", reviewId)
            .single();

        const review = reviewData as ReviewRow | null;

        if (reviewError || !review) {
            return NextResponse.json({ error: "Review not found." }, { status: 404 });
        }

        const { data: apartmentData, error: apartmentError } = await supabase
            .from("apartments")
            .select("id, name, slug, management_company")
            .eq("id", review.apartment_id)
            .single();

        const apartment = apartmentData as ApartmentRow | null;

        if (apartmentError || !apartment) {
            return NextResponse.json({ error: "Apartment not found." }, { status: 404 });
        }

        const result = await publishToBluesky({
            text: buildReviewPostText(review, apartment),
            url: `/apartments/${apartment.slug}#review-${review.id}`,
            langs: ["en-US"],
            rkey: buildReviewRkey(review),
        });

        return NextResponse.json({
            ok: true,
            uri: result.uri,
            cid: result.cid,
        });
    } catch (error) {
        console.error("[Bluesky] Review automation failed:", error);
        const message = error instanceof Error ? error.message : "Failed to automate Bluesky post.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
