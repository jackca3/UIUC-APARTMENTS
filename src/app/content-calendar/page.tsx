import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XStudio } from "@/components/x-studio";
import { ArrowRight, CalendarDays, Megaphone, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Hub | Apt.ly",
  description:
    "Plan Apt.ly launch messaging, manage content strategy, and save social post drafts for UIUC apartment hunters.",
};

export default function ContentCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-uiuc-navy px-4 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(232,74,39,0.34),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_24%)]" />
        <div className="container relative z-10 mx-auto">
          <Badge className="mb-6 bg-uiuc-orange/20 px-4 py-1 text-uiuc-orange hover:bg-uiuc-orange/30">
            Apt.ly Content Hub
          </Badge>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
                Launch content for UIUC apartment hunters.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-gray-300">
                This page is for Apt.ly's launch messaging and content strategy. Real student
                review posts now live on their own reviews page.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                Review feed moved
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tighter">
                Looking for student reviews?
              </h2>
              <p className="mt-3 text-sm font-medium leading-6 text-gray-300">
                The live database-driven review feed is separated from this content hub.
              </p>
              <Button asChild className="mt-5 w-full rounded-full bg-uiuc-orange font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90">
                <Link href="/reviews">
                  View reviews <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-uiuc-orange">
              Original purpose
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-uiuc-navy md:text-5xl">
              A marketing plan, not a review timeline
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-gray-500">
              Apt.ly's content flow should explain the product, reach early UIUC users, and push
              students toward browsing apartments or writing real reviews.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <StrategyCard
              icon={<Users className="h-6 w-6" />}
              title="Audience"
              body="Stressed students comparing leases, students with bad housing experiences, and campus connectors who already give apartment advice."
            />
            <StrategyCard
              icon={<Megaphone className="h-6 w-6" />}
              title="Message"
              body="Apt.ly is the honest, student-only way to compare apartments without depending on scattered Reddit threads or landlord marketing."
            />
            <StrategyCard
              icon={<CalendarDays className="h-6 w-6" />}
              title="Launch flow"
              body="Use content to drive classmates and friends to browse apartments, submit reviews, and share the tool before launch deadlines."
            />
          </div>

          <div className="mt-10 rounded-[34px] border border-gray-100 bg-white p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                  Main conversion
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-uiuc-navy">
                  Turn attention into apartment action
                </h3>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-gray-500">
                  The content page should send users into the product. Reviews are still real,
                  searchable, and database-backed, but they are no longer taking over this page.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-uiuc-navy px-7 font-black uppercase tracking-widest text-white hover:bg-uiuc-navy/90">
                  <Link href="/apartments">Browse apartments</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-7 font-black uppercase tracking-widest">
                  <Link href="/reviews">Read reviews</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-uiuc-orange">
              X integration
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-uiuc-navy md:text-5xl">
              Connect your account and queue posts safely
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-gray-500">
              This studio keeps tokens on the server, stores drafts inside the app first, and only
              publishes when you explicitly choose a saved draft.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex min-h-[280px] items-center justify-center rounded-[36px] border border-gray-100 bg-white">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-uiuc-navy/40">
                  Loading X Studio...
                </p>
              </div>
            }
          >
            <XStudio />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function StrategyCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-uiuc-orange/10 text-uiuc-orange">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter text-uiuc-navy">
        {title}
      </h3>
      <p className="mt-4 text-sm font-medium leading-7 text-gray-500">{body}</p>
    </article>
  );
}
