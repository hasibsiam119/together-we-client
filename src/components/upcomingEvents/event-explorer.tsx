"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarArrowUp,
  CalendarSearch,
  CalendarX2,
  RotateCcw,
  Search,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";

import EventCard from "@/components/eventCard";
import {
  EVENT_CATEGORIES,
  matchesCategory,
  type TogetherWeEvent,
} from "@/lib/events";

type EventExplorerProps = {
  events: TogetherWeEvent[];
  hasError?: boolean;
};

const EventExplorer = ({ events, hasError = false }: EventExplorerProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All Events");

  const normalizedQuery = query.trim().toLowerCase();
  const filtersActive =
    normalizedQuery.length > 0 || category !== "All Events";
  const showFilteredEmpty = filtersActive && events.length > 0;

  const filteredEvents = events.filter((event) => {
    const searchableText = `${event.title} ${event.location}`.toLowerCase();

    return (
      (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
      matchesCategory(event, category)
    );
  });

  const clearFilters = () => {
    setQuery("");
    setCategory("All Events");
  };

  return (
    <div>
      <div className="rounded-2xl border border-border/80 bg-card/90 p-3 shadow-sm backdrop-blur sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full shrink-0 lg:w-80">
            <label htmlFor="event-search" className="sr-only">
              Search events
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
            <input
              id="event-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events by title or location..."
              className="h-11 w-full rounded-xl border border-border bg-background/70 pl-10 pr-10 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/25 focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter events by category"
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pb-0"
          >
            {EVENT_CATEGORIES.map((option) => {
              const isActive = category === option;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setCategory(option)}
                  className={`inline-flex h-9 shrink-0 items-center rounded-full border px-3.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm dark:border-emerald-500 dark:bg-emerald-500 dark:text-emerald-950"
                      : "border-border bg-background/60 text-muted-foreground hover:border-primary/25 hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <span className="inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-full border border-primary/15 bg-secondary/50 px-3.5 text-xs font-semibold text-primary lg:self-auto dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            <CalendarArrowUp className="size-3.5" />
            Sorted by: Nearest Date
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary dark:text-emerald-400">
            <Sparkles className="size-3.5" />
            Browse what is next
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
            Upcoming Community Events
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            Find your next opportunity to make a positive impact.
          </p>
        </div>

        <span
          aria-live="polite"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-primary/15 bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm dark:border-emerald-400/20"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "event" : "events"}
        </span>
      </div>

      {hasError && (
        <div
          role="status"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:border-amber-400/25 dark:text-amber-200"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <p className="leading-6">
            We couldn&apos;t load the latest events right now. Please refresh
            the page in a moment.
          </p>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <li key={event._id} className="h-full">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-6 overflow-hidden rounded-[24px] border border-dashed border-primary/20 bg-card/60 px-6 py-14 text-center sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 size-72 -translate-x-1/2 rounded-full bg-secondary/60 blur-3xl dark:bg-emerald-400/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-primary/10"
          />

          <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/15 bg-secondary/60 text-primary shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            {showFilteredEmpty ? (
              <CalendarSearch className="size-7" />
            ) : (
              <CalendarX2 className="size-7" />
            )}
          </span>

          <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
            {showFilteredEmpty
              ? "No Events Match Your Search"
              : "No Upcoming Events Yet"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {showFilteredEmpty
              ? "Try a different keyword or choose another category to discover more community initiatives."
              : "New opportunities are coming soon. Check back later and be ready to make a difference."}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {showFilteredEmpty ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-card px-4 text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10"
              >
                <RotateCcw className="size-4" />
                Clear Filters
              </button>
            ) : (
              <Link
                href="/events/create"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-emerald-600"
              >
                Create an Event
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventExplorer;
