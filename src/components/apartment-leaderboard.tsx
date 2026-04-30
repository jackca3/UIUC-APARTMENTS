"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApartmentLeaderboard, type ApartmentLeaderboardEntry } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { ArrowRight, Building2, Loader2, Trophy } from "lucide-react";

export function ApartmentLeaderboard() {
  const [entries, setEntries] = useState<ApartmentLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      const leaderboard = await getApartmentLeaderboard();
      if (isMounted) {
        setEntries(leaderboard);
        setLoading(false);
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[40px] border border-gray-100 bg-white p-10 text-center shadow-sm">
        <Loader2 className="mb-5 h-10 w-10 animate-spin text-uiuc-orange" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-uiuc-navy/40">
          Calculating leaderboard...
        </p>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="rounded-[40px] border-4 border-dashed border-gray-200 bg-white p-10 text-center shadow-sm md:p-16">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[30px] bg-gray-50">
          <Trophy className="h-10 w-10 text-gray-300" />
        </div>
        <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-uiuc-navy">
          No ranked apartments yet
        </h3>
        <p className="mx-auto max-w-xl text-sm font-bold uppercase leading-7 tracking-widest text-gray-400">
          Rankings will appear here once real reviews are created.
        </p>
        <Button asChild className="mt-10 rounded-full bg-uiuc-orange px-8 font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90">
          <Link href="/apartments">Find an apartment to review</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {entries.map((entry, index) => (
        <LeaderboardCard key={entry.apartment_id} entry={entry} rank={index + 1} />
      ))}
    </div>
  );
}

function LeaderboardCard({
  entry,
  rank,
}: {
  entry: ApartmentLeaderboardEntry;
  rank: number;
}) {
  const categoryScores = [
    { label: "Management", value: entry.avg_management_rating },
    { label: "Maintenance", value: entry.avg_maintenance_rating },
    { label: "Value", value: entry.avg_value_rating },
    { label: "Noise", value: entry.avg_noise_rating },
  ];

  const bestCategory = categoryScores.reduce((best, current) =>
    current.value > best.value ? current : best
  );

  const sampleBadge =
    entry.review_count < 3 ? "Low sample" : `${entry.review_count} reviews`;

  return (
    <article className="overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium">
      <div className="grid gap-0 lg:grid-cols-[150px_1fr]">
        <div className="flex flex-col items-center justify-center gap-3 bg-uiuc-navy px-6 py-10 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            Rank
          </p>
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white text-4xl font-black text-uiuc-navy">
            {rank}
          </div>
          <Badge className="bg-uiuc-orange text-white hover:bg-uiuc-orange">
            {sampleBadge}
          </Badge>
        </div>

        <div className="p-7 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/apartments/${entry.apartment_slug}`}
                  className="text-2xl font-black uppercase tracking-tighter text-uiuc-navy transition-colors hover:text-uiuc-orange md:text-3xl"
                >
                  {entry.apartment_name}
                </Link>
                <Badge className="bg-uiuc-orange/10 text-uiuc-orange hover:bg-uiuc-orange/10">
                  Best {bestCategory.label.toLowerCase()}
                </Badge>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {entry.apartment_address}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Leaderboard score
                  </p>
                  <p className="text-4xl font-black tracking-tighter text-uiuc-orange">
                    {entry.leaderboard_score.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Avg rating
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <StarRating rating={entry.raw_average_rating} size="sm" />
                    <span className="text-sm font-black text-uiuc-navy">
                      {entry.raw_average_rating.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              {entry.avg_monthly_rent_paid !== null ? (
                <div className="rounded-2xl bg-gray-50 px-5 py-4 text-left md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Avg reported rent
                  </p>
                  <p className="mt-1 text-xl font-black text-uiuc-navy">
                    ${Math.round(entry.avg_monthly_rent_paid)}
                    <span className="ml-1 text-sm text-gray-300">/mo</span>
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-gray-50 px-5 py-4 text-left md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Avg reported rent
                  </p>
                  <p className="mt-1 text-sm font-black uppercase tracking-widest text-gray-300">
                    No rent reports yet
                  </p>
                </div>
              )}

              <Button asChild variant="outline" className="rounded-full px-6 font-black uppercase tracking-widest">
                <Link href={`/apartments/${entry.apartment_slug}`}>
                  View apartment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {categoryScores.map((category) => (
              <div key={category.label} className="rounded-2xl bg-gray-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {category.label}
                </p>
                <p className="mt-2 text-2xl font-black tracking-tighter text-uiuc-navy">
                  {category.value.toFixed(1)}
                  <span className="ml-1 text-sm text-gray-300">/5</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-uiuc-navy">
              <Building2 className="h-4 w-4 text-uiuc-orange" />
              {entry.management_company || "Independent management"}
            </span>
            <span className="rounded-full bg-gray-50 px-4 py-2">
              {entry.review_count} verified student review{entry.review_count === 1 ? "" : "s"}
            </span>
            <span className="rounded-full bg-gray-50 px-4 py-2">
              Top strength: {bestCategory.label} {bestCategory.value.toFixed(1)}/5
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
