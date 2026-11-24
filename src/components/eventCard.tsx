"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  HandHeart,
  ImageOff,
  MapPin,
  Sparkles,
  Stethoscope,
  Trash2,
  TreePine,
  Users,
  type LucideIcon,
} from "lucide-react";

import { formatEventDate, type TogetherWeEvent } from "@/lib/events";

const categoryStyles: Record<string, string> = {
  Donation: "bg-amber-50/95 text-amber-800",
  Cleanup: "bg-emerald-50/95 text-emerald-800",
  Plantation: "bg-lime-50/95 text-lime-800",
  Education: "bg-sky-50/95 text-sky-800",
  Healthcare: "bg-rose-50/95 text-rose-800",
  "Community Support": "bg-violet-50/95 text-violet-800",
  Other: "bg-white/95 text-foreground",
};

const categoryIcons: Record<string, LucideIcon> = {
  Donation: HandHeart,
  Cleanup: Trash2,
  Plantation: TreePine,
  Education: GraduationCap,
  Healthcare: Stethoscope,
  "Community Support": Users,
  Other: Sparkles,
};

const EventCard = ({ event }: { event: TogetherWeEvent }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const CategoryIcon = categoryIcons[event.type] ?? categoryIcons.Other;
  const categoryStyle =
    categoryStyles[event.type] ?? categoryStyles.Other;
  const hasImage = Boolean(event.thumbnail) && !imageFailed;
  const eventHref = `/upcomingEvents/${event._id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.07] focus-within:border-primary/25 focus-within:shadow-lg">
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
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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

        <span
          className={`absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] shadow-sm ring-1 ring-black/5 backdrop-blur ${categoryStyle}`}
        >
          <CategoryIcon className="size-3.5 shrink-0" />
          <span className="truncate">{event.type}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-foreground">
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

        {event.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {event.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5 text-xs font-semibold text-primary dark:bg-emerald-400/10 dark:text-emerald-300">
              <CalendarDays className="size-3.5" />
              {formatEventDate(event.date)}
            </span>

            <Link
              href={eventHref}
              aria-label={`View event: ${event.title}`}
              className="group/cta inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-card px-3 py-2 text-xs font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:border-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-emerald-950"
            >
              View Event
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
