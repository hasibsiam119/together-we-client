import { Suspense } from "react";
import { Manrope } from "next/font/google";
import {
  CalendarDays,
  HandHeart,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";

import EventExplorer from "@/components/upcomingEvents/event-explorer";
import EventsSkeleton from "@/components/upcomingEvents/events-skeleton";
import {
  getUpcomingEvents,
  normalizeEvents,
  type TogetherWeEvent,
} from "@/lib/events";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const dynamic = "force-dynamic";

async function EventsSection() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let events: TogetherWeEvent[] = [];
  let hasError = false;

  if (!apiUrl) {
    hasError = true;
  } else {
    try {
      const response = await fetch(`${apiUrl}/events`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        throw new Error(`Events request failed with status ${response.status}`);
      }

      const payload: unknown = await response.json();
      events = getUpcomingEvents(normalizeEvents(payload));
    } catch (error) {
      hasError = true;
      console.error("Failed to load upcoming events:", error);
    }
  }

  return <EventExplorer events={events} hasError={hasError} />;
}

const UpcomingEventsPage = () => {
  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_45%_at_85%_0%,var(--secondary),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-24 -z-10 size-80 rounded-full bg-primary/5 blur-3xl dark:bg-emerald-400/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-32 -z-10 hidden size-44 opacity-20 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-24 -z-10 hidden size-72 rounded-full border border-primary/10 lg:block dark:border-emerald-400/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-28 top-24 -z-10 hidden size-14 rotate-12 rounded-2xl border border-accent/25 lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24">
        <header className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/50 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Discover &amp; Participate
            </p>

            <h1
              id="upcoming-events-heading"
              className="mt-5 text-[clamp(2.1rem,4.5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-balance text-foreground"
            >
              Find Events That{" "}
              <span className="relative inline-block text-primary dark:text-emerald-400">
                Make a Difference
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/70"
                >
                  <path
                    d="M2 9C72 3 214 2 298 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Discover meaningful community initiatives around you. Join hands
              with passionate people and turn small actions into positive
              change.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
                <CalendarDays className="size-3.5 text-primary dark:text-emerald-400" />
                Local events, sorted by date
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
                <Users className="size-3.5 text-primary dark:text-emerald-400" />
                Volunteer-led initiatives
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[17rem] lg:block">
            <div
              aria-hidden
              className="animate-hero-float pointer-events-none absolute inset-12 rounded-full bg-secondary/70 blur-2xl dark:bg-emerald-400/10"
            />
            <div className="relative aspect-square">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-primary/10 dark:border-emerald-400/15"
              />
              <div
                aria-hidden
                className="absolute inset-8 rounded-full border border-dashed border-primary/20 dark:border-emerald-400/20"
              />
              <div
                aria-hidden
                className="absolute inset-16 rounded-full border border-primary/10 dark:border-emerald-400/15"
              />

              <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] bg-primary text-primary-foreground shadow-xl shadow-primary/25 dark:bg-emerald-500 dark:text-emerald-950">
                <HeartHandshake className="size-9" />
              </div>

              <span className="absolute left-1/2 top-0 grid size-11 -translate-x-1/2 place-items-center rounded-2xl border border-primary/10 bg-card text-primary shadow-sm dark:border-emerald-400/20 dark:text-emerald-400">
                <CalendarDays className="size-5" />
              </span>
              <span className="absolute right-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
                <Users className="size-5" />
              </span>
              <span className="absolute bottom-0 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 dark:bg-emerald-500 dark:text-emerald-950">
                <HandHeart className="size-5" />
              </span>
              <span className="absolute left-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-2xl border border-primary/10 bg-card text-primary shadow-sm dark:border-emerald-400/20 dark:text-emerald-400">
                <Sparkles className="size-5" />
              </span>

              <div className="absolute -bottom-3 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-border/80 bg-card/95 px-4 py-2.5 text-center shadow-lg backdrop-blur">
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Small actions
                </p>
                <p className="text-sm font-bold text-foreground">
                  Greater impact.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-9 sm:mt-11">
          <Suspense fallback={<EventsSkeleton />}>
            <EventsSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsPage;
