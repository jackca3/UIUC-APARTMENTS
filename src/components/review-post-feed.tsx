"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentReviewPosts, type ReviewPost } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { Loader2, MessageSquareText, ShieldCheck } from "lucide-react";

export function ReviewPostFeed() {
  const [posts, setPosts] = useState<ReviewPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      const realPosts = await getRecentReviewPosts();
      if (isMounted) {
        setPosts(realPosts);
        setLoading(false);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[40px] border border-gray-100 bg-white p-10 text-center shadow-sm">
        <Loader2 className="mb-5 h-10 w-10 animate-spin text-uiuc-orange" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-uiuc-navy/40">
          Loading real posts...
        </p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="rounded-[40px] border-4 border-dashed border-gray-200 bg-white p-10 text-center shadow-sm md:p-16">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[30px] bg-gray-50">
          <MessageSquareText className="h-10 w-10 text-gray-300" />
        </div>
        <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-uiuc-navy">
          No posts yet
        </h3>
        <p className="mx-auto max-w-xl text-sm font-bold uppercase leading-7 tracking-widest text-gray-400">
          Content will appear here once reviews/posts are created.
        </p>
        <Button asChild className="mt-10 rounded-full bg-uiuc-orange px-8 font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90">
          <Link href="/apartments">Find an apartment to review</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {posts.map((post) => (
        <ReviewPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function ReviewPostCard({ post }: { post: ReviewPost }) {
  const averageRating =
    (post.management_rating +
      post.maintenance_rating +
      post.value_rating +
      post.noise_rating) /
    4;

  return (
    <article className="rounded-[34px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <Link
            href={`/apartments/${post.apartment_slug}`}
            className="text-2xl font-black uppercase tracking-tighter text-uiuc-navy transition-colors hover:text-uiuc-orange"
          >
            {post.apartment_name}
          </Link>
          <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            {post.apartment_address}
          </p>
        </div>
        <Badge className="w-fit bg-uiuc-navy text-white hover:bg-uiuc-navy">
          Real review
        </Badge>
      </div>

      <p className="mb-6 text-lg font-medium italic leading-8 text-gray-700">
        "{post.written_review}"
      </p>

      {post.image_urls.length > 0 ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {post.image_urls.slice(0, 2).map((url, index) => (
            <a
              key={`${post.id}-${url}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video overflow-hidden rounded-2xl bg-gray-100"
            >
              <img
                src={url}
                alt={`Review photo ${index + 1} for ${post.apartment_name}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </a>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 border-t border-gray-100 pt-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-uiuc-orange/10 text-uiuc-orange">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-uiuc-navy">@{post.author_name}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {post.is_verified ? "Verified Illini" : "Student review"} -{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <StarRating rating={averageRating} size="sm" />
          {post.monthly_rent_paid ? (
            <p className="text-xs font-black uppercase tracking-widest text-uiuc-orange">
              ${Math.round(post.monthly_rent_paid)}/mo reported
            </p>
          ) : (
            <p className="text-xs font-black uppercase tracking-widest text-gray-300">
              Rent not reported
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 sm:grid-cols-4">
        <Metric label="Management" value={post.management_rating} />
        <Metric label="Maintenance" value={post.maintenance_rating} />
        <Metric label="Value" value={post.value_rating} />
        <Metric label="Noise" value={post.noise_rating} />
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="mt-1 text-sm text-uiuc-navy">{value}/5</p>
    </div>
  );
}
