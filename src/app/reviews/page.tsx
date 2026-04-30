import Link from "next/link";
import { ApartmentLeaderboard } from "@/components/apartment-leaderboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Apartments Leaderboard | Apt.ly",
  description:
    "See the top-ranked UIUC apartments on Apt.ly based on real student reviews across management, maintenance, value, and noise.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-uiuc-navy px-4 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,74,39,0.35),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.12),transparent_24%)]" />
        <div className="container relative z-10 mx-auto">
          <Badge className="mb-6 bg-uiuc-orange/20 px-4 py-1 text-uiuc-orange hover:bg-uiuc-orange/30">
            Best Apartments Leaderboard
          </Badge>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
                Ranked by real student reviews, not marketing spin.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-gray-300">
                This leaderboard uses real Apt.ly review data already stored in Supabase. Apartments
                are ranked from highest to lowest using the four real rating categories students
                submit today.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                Ranking logic
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tighter">
                Weighted by review count
              </h2>
              <p className="mt-3 text-sm font-medium leading-6 text-gray-300">
                We average management, maintenance, value, and noise, then lightly stabilize the
                score so one review does not overpower a stronger sample.
              </p>
              <Button asChild className="mt-5 w-full rounded-full bg-uiuc-orange font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90">
                <Link href="/apartments">
                  Browse apartments <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-uiuc-orange">
                Live ranking
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-uiuc-navy md:text-5xl">
                Best apartments right now
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-7 text-gray-500">
              The leaderboard updates from the existing reviews table. Add new apartment reviews,
              and the rankings shift using that same real source of truth.
            </p>
          </div>

          <div className="mb-8 rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-uiuc-orange/10 text-uiuc-orange">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                    Real data only
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase tracking-tighter text-uiuc-navy">
                    No fake rankings, no placeholder winners
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-gray-500">
                    Every row here comes from a real apartment with at least one real student review.
                    You can click through any apartment to inspect the underlying review detail page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ApartmentLeaderboard />
        </div>
      </section>
    </div>
  );
}
