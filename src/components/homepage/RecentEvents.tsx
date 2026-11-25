"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Manrope } from "next/font/google";
import {
  ArrowRight,
  CalendarDays,
  CalendarX2,
  ImageOff,
  MapPin,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";

import {
  formatEventDate,
  normalizeEvents,
  type TogetherWeEvent,
} from "@/lib/events";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const skeletonCards = Array.from({ length: 6 });

function RecentEventCard({ event }: { event: TogetherWeEvent }) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = Boolean(event.thumbnail) && !imageFailed;
  const eventHref = `/upcomingEvents/${event._id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.07]">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.thumbnail}
              alt={event.title}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent"
            />
          </>
        ) : (
          <div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-card to-primary/10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full border border-primary/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-8 size-36 rounded-full bg-accent/10 blur-2xl"
            />
            <div className="relative flex flex-col items-center gap-2 text-center">
              <span className="grid size-12 place-items-center rounded-2xl border border-primary/15 bg-card/80 text-primary shadow-sm dark:text-emerald-400">
                <ImageOff className="size-5" />
              </span>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Event cover
              </p>
            </div>
          </div>
        )}

        <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-[#dcfce7]/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#166534] shadow-sm ring-1 ring-black/5 backdrop-blur">
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="truncate">{event.type}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {event.date && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5 text-xs font-semibold text-primary dark:bg-emerald-400/10 dark:text-emerald-300">
            <CalendarDays className="size-3.5" />
            {formatEventDate(event.date)}
          </span>
        )}

        <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.02em] text-foreground">
          <Link
            href={eventHref}
            className="line-clamp-2 transition-colors duration-200 group-hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:group-hover:text-emerald-400"
          >
            {event.title}
          </Link>
        </h3>

        {event.location && (
          <p className="mt-2 flex items-start gap-1.5 text-sm leading-5 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary/70 dark:text-emerald-400/70" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {event.description ||
            "Join us and be part of this meaningful community initiative."}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={eventHref}
            aria-label={`View details for ${event.title}`}
            className="group/cta inline-flex items-center gap-1.5 rounded-xl border border-primary/15 bg-card px-3.5 py-2 text-xs font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:border-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-emerald-950"
          >
            View Details
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const RecentEvents = () => {
  const [events, setEvents] = useState<TogetherWeEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadEvents = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        const response = await fetch(`${apiUrl}/featured`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Featured events request failed: ${response.status}`);
        }

        const payload: unknown = await response.json();

        setEvents(normalizeEvents(payload).slice(0, 6));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load featured events:", error);
        setEvents([]);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <section
      aria-labelledby="recent-events-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_85%_0%,var(--secondary),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 size-72 rounded-full bg-secondary/50 blur-3xl dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-0 -z-10 hidden size-48 opacity-25 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary dark:text-emerald-400">
              <span
                aria-hidden
                className="h-px w-7 bg-primary/40 dark:bg-emerald-400/40"
              />
              Make an Impact
            </p>

            <h2
              id="recent-events-heading"
              className="mt-4 max-w-3xl text-[clamp(1.9rem,3.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.035em] text-balance text-foreground"
            >
              Upcoming{" "}
              <span className="relative inline-block text-primary dark:text-emerald-400">
                Events
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/70"
                >
                  <path
                    d="M2 9C52 3 156 2 218 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 lg:pb-1 lg:text-right">
            Discover meaningful events and join hands to make a positive
            difference in our community.
          </p>
        </div>

        <div aria-live="polite" className="mt-12 lg:mt-14">
          {isLoading && (
            <div
              role="status"
              aria-busy="true"
              aria-label="Loading upcoming events"
            >
              <span className="sr-only">Loading upcoming events...</span>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {skeletonCards.map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-sm"
                  >
                    <div className="aspect-video w-full animate-pulse bg-muted" />
                    <div className="animate-pulse space-y-3 p-5 sm:p-6">
                      <div className="h-6 w-28 rounded-lg bg-muted" />
                      <div className="h-5 w-4/5 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted" />
                      <div className="space-y-2 pt-1">
                        <div className="h-3.5 w-full rounded bg-muted" />
                        <div className="h-3.5 w-11/12 rounded bg-muted" />
                        <div className="h-3.5 w-2/3 rounded bg-muted" />
                      </div>
                      <div className="h-9 w-28 rounded-xl bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && hasError && (
            <div
              role="status"
              className="relative overflow-hidden rounded-[24px] border border-dashed border-amber-500/30 bg-amber-500/[0.07] px-6 py-12 text-center sm:py-14"
            >
              <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:text-amber-300">
                <TriangleAlert className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                We Couldn&apos;t Load the Events
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Something went wrong while loading the latest events. Please try
                again in a moment.
              </p>
              <button
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
                className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-emerald-600"
              >
                <RotateCcw className="size-4" />
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !hasError && events.length === 0 && (
            <div className="relative overflow-hidden rounded-[24px] border border-dashed border-primary/20 bg-card/60 px-6 py-12 text-center sm:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 -z-10 size-72 -translate-x-1/2 rounded-full bg-secondary/60 blur-3xl dark:bg-emerald-400/5"
              />
              <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/15 bg-secondary/60 text-primary shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                <CalendarX2 className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                No Upcoming Events Yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                New opportunities are coming soon. Check back later and be ready
                to make a difference.
              </p>
            </div>
          )}

          {!isLoading && !hasError && events.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event._id} className="h-full">
                  <RecentEventCard event={event} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link
            href="/upcomingEvents"
            className="group inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-emerald-600"
          >
            View All Events
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
