import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CalendarX2,
  CheckCircle2,
  ChevronRight,
  Heart,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  Sparkles,
  Tag,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  formatEventDate,
  formatEventDateMedium,
  toDateOnly,
  type EventDetails,
} from "@/lib/events";

import EventThumbnail from "./event-thumbnail";
import JoinCard from "@/components/joinedCard";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const dynamic = "force-dynamic";

type UnknownRecord = Record<string, unknown>;

const BULLET_PATTERN = /^(?:[-*•–]|\d+[.)])\s+/;
const HIGHLIGHT_KEYWORDS =
  /volunteer|join|help|support|bring|distribut|activit|communit|participant|famil|children|donat|clean|plant|educat|health|together|provide|collect|share/i;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function firstText(...values: unknown[]) {
  for (const value of values) {
    const text = asText(value);

    if (text) {
      return text;
    }
  }

  return "";
}

function normalizeEvent(payload: unknown): EventDetails | null {
  if (!isRecord(payload)) {
    return null;
  }

  const title = asText(payload.title);

  if (!title) {
    return null;
  }

  const createdBy = isRecord(payload.createdBy) ? payload.createdBy : {};
  const organizer = isRecord(payload.organizer) ? payload.organizer : {};
  const creator = isRecord(payload.creator) ? payload.creator : {};
  const author = isRecord(payload.author) ? payload.author : {};

  return {
    id: firstText(payload._id, payload.id),
    title,
    type: asText(payload.type),
    date: asText(payload.date),
    location: asText(payload.location),
    thumbnail: asText(payload.thumbnail),
    description: asText(payload.description),
    organizerName: firstText(
      payload.creatorName,
      payload.organizerName,
      payload.authorName,
      createdBy.name,
      organizer.name,
      creator.name,
      author.name,
    ),
    organizerEmail: firstText(
      payload.creatorEmail,
      payload.organizerEmail,
      payload.authorEmail,
      createdBy.email,
      organizer.email,
      creator.email,
      author.email,
    ),
    organizerImage: firstText(
      payload.creatorImage,
      payload.organizerImage,
      payload.authorImage,
      createdBy.image,
      organizer.image,
      creator.image,
      author.image,
    ),
  };
}

async function getEvent(id: string): Promise<EventDetails | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);

    if (!res.ok) {
      return null;
    }

    const body = await res.text();

    if (!body.trim()) {
      return null;
    }

    return normalizeEvent(JSON.parse(body));
  } catch (error) {
    console.error("Failed to load event details:", error);
    return null;
  }
}

function formatEventDateLong(value: string) {
  const dateOnly = toDateOnly(value);
  const [year, month, day] = dateOnly.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatEventDateShort(value: string) {
  const dateOnly = toDateOnly(value);

  return dateOnly ? formatEventDate(dateOnly) : value;
}

function getDescriptionParagraphs(description: string) {
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function extractHighlights(description: string) {
  if (!description) {
    return [];
  }

  const bulletHighlights = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => BULLET_PATTERN.test(line))
    .map((line) => line.replace(BULLET_PATTERN, "").trim())
    .filter((line) => line.length > 3);

  if (bulletHighlights.length > 0) {
    return Array.from(new Set(bulletHighlights)).slice(0, 5);
  }

  const sentences = description.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/);

  return sentences
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence.length >= 45 &&
        sentence.length <= 190 &&
        HIGHLIGHT_KEYWORDS.test(sentence),
    )
    .slice(0, 3);
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "TW";
}

function BackgroundDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_42%_at_84%_0%,var(--secondary),transparent_66%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-28 -z-10 size-80 rounded-full bg-primary/5 blur-3xl dark:bg-emerald-400/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-24 -z-10 hidden size-40 opacity-20 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-[30rem] -z-10 hidden size-72 rounded-full border border-primary/10 lg:block dark:border-emerald-400/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-10 top-[38rem] -z-10 hidden size-14 rotate-12 rounded-2xl border border-accent/25 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-40 left-1/3 -z-10 hidden size-64 rounded-full bg-secondary/50 blur-3xl lg:block dark:bg-emerald-400/5"
      />
    </>
  );
}

function TopNavigation() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-emerald-400"
            >
              <Home className="size-3.5" aria-hidden />
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
          </li>
          <li>
            <Link
              href="/upcomingEvents"
              className="rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-emerald-400"
            >
              Upcoming Events
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
          </li>
          <li>
            <span
              aria-current="page"
              className="font-semibold text-foreground"
            >
              Event Details
            </span>
          </li>
        </ol>
      </nav>

      <Link
        href="/upcomingEvents"
        className="group inline-flex w-fit items-center gap-2.5 rounded-full text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-emerald-400"
      >
        <span className="grid size-8 place-items-center rounded-full border border-border bg-card shadow-sm transition-all duration-200 group-hover:-translate-x-0.5 group-hover:border-primary/25 group-hover:text-primary dark:group-hover:text-emerald-400">
          <ArrowLeft className="size-4" aria-hidden />
        </span>
        Back to Upcoming Events
      </Link>
    </div>
  );
}

function FactCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex min-w-0 items-start gap-3 rounded-2xl border border-border/70 bg-card/75 p-4 shadow-sm backdrop-blur">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary/70 text-primary dark:bg-emerald-400/10 dark:text-emerald-400">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm font-semibold leading-5 text-foreground">
          {children}
        </span>
      </span>
    </li>
  );
}

function AboutCard({ description }: { description: string }) {
  const paragraphs = getDescriptionParagraphs(description);

  return (
    <section
      aria-labelledby="about-event-heading"
      className="relative overflow-hidden rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full border border-primary/10 dark:border-emerald-400/10"
      />

      <div className="relative flex items-start gap-3.5 border-b border-border/70 pb-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary/70 text-primary dark:bg-emerald-400/10 dark:text-emerald-400">
          <HeartHandshake className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary dark:text-emerald-400">
            The story
          </p>
          <h2
            id="about-event-heading"
            className="mt-1 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl"
          >
            About This Event
          </h2>
        </div>
      </div>

      <div className="relative mt-5">
        {paragraphs.length > 0 ? (
          <div className="space-y-4 text-[0.95rem] leading-7 text-foreground/80 sm:text-base sm:leading-8">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-background/60 p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary/60 text-primary dark:bg-emerald-400/10 dark:text-emerald-400">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <p className="text-sm leading-6 text-muted-foreground">
              The organizer hasn&apos;t added a description for this event yet.
              Check back soon for more details about this initiative.
            </p>
          </div>
        )}
      </div>

      {paragraphs.length > 0 && (
        <p className="relative mt-6 flex items-start gap-2 border-t border-border/70 pt-5 text-xs leading-5 text-muted-foreground">
          <Heart
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 fill-current text-amber-500 dark:text-amber-400"
          />
          Details are shared by the event organizer and the TogetherWe
          community.
        </p>
      )}
    </section>
  );
}

function HighlightsCard({ highlights }: { highlights: string[] }) {
  return (
    <section
      aria-labelledby="event-highlights-heading"
      className="overflow-hidden rounded-[24px] border border-primary/10 bg-card shadow-sm"
    >
      <div className="relative border-b border-border/70 bg-[radial-gradient(ellipse_65%_130%_at_0%_0%,var(--secondary),transparent_72%)] px-5 py-5 sm:px-7 sm:py-6 dark:bg-[radial-gradient(ellipse_65%_130%_at_0%_0%,rgba(16,185,129,0.12),transparent_72%)]">
        <div className="relative flex items-center gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 dark:bg-emerald-500 dark:text-emerald-950">
            <Sparkles className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary dark:text-emerald-400">
              Key takeaways
            </p>
            <h2
              id="event-highlights-heading"
              className="mt-1 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl"
            >
              Event Highlights
            </h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              A quick recap of what the organizer shared.
            </p>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-border/70 px-5 sm:px-7">
        {highlights.map((highlight, index) => (
          <li key={`${index}-${highlight}`} className="flex items-start gap-3 py-4">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-secondary/70 text-primary dark:bg-emerald-400/10 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" aria-hidden />
            </span>
            <p className="text-sm leading-6 text-foreground/80">
              {highlight}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function OrganizerCard({ event }: { event: EventDetails }) {
  const displayName = event.organizerName || "Event Organizer";
  const initials = getInitials(event.organizerName || "TogetherWe");

  return (
    <section
      aria-labelledby="event-organizer-heading"
      className="relative overflow-hidden rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-12 size-44 rounded-full bg-accent/5 blur-2xl"
      />

      <div className="relative flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary/70 text-primary dark:bg-emerald-400/10 dark:text-emerald-400">
          <UserRound className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary dark:text-emerald-400">
            Hosted by
          </p>
          <h2
            id="event-organizer-heading"
            className="mt-1 text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl"
          >
            Meet the Organizer
          </h2>
        </div>
      </div>

      <div className="relative mt-5 flex flex-col gap-4 rounded-2xl border border-border/70 bg-background/60 p-4 sm:flex-row sm:items-center">
        <Avatar size="lg" className="size-14 ring-2 ring-card">
          {event.organizerImage && (
            <AvatarImage src={event.organizerImage} alt={displayName} />
          )}
          <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
            {event.organizerName ? (
              initials
            ) : (
              <UserRound className="size-5" aria-hidden />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-bold text-foreground">
            {displayName}
          </p>
          {event.organizerEmail ? (
            <a
              href={`mailto:${event.organizerEmail}`}
              className="mt-1 inline-flex max-w-full items-center gap-1.5 break-all text-sm leading-5 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:text-emerald-400"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden />
              {event.organizerEmail}
            </a>
          ) : (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Community host on TogetherWe
            </p>
          )}
        </div>

        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-primary/15 bg-secondary/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-primary sm:inline-flex dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
          <HeartHandshake className="size-3" aria-hidden />
          Organizer
        </span>
      </div>
    </section>
  );
}

function EventContent({ event }: { event: EventDetails }) {
  const highlights = extractHighlights(event.description);
  const hasOrganizer = Boolean(
    event.organizerName || event.organizerEmail || event.organizerImage,
  );
  const dateOnly = event.date ? toDateOnly(event.date) : "";
  const hasFacts = Boolean(event.date || event.location || event.type);

  return (
    <>
      <header className="mt-6 sm:mt-8">
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[26px] border border-border/80 bg-card shadow-xl shadow-primary/[0.07] sm:aspect-[16/9] sm:rounded-[30px] lg:aspect-[21/9]">
          <EventThumbnail src={event.thumbnail} alt={event.title} />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071a12]/80 via-[#071a12]/10 to-transparent"
          />

          {event.type && (
            <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-emerald-900 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <Tag className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{event.type}</span>
            </span>
          )}

          {event.date && (
            <div className="absolute bottom-4 left-4 right-4 flex sm:right-auto">
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-2xl border border-white/20 bg-black/30 px-3.5 py-2.5 text-white shadow-lg backdrop-blur-md sm:px-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/15">
                  <CalendarDays className="size-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.55rem] font-bold uppercase tracking-[0.16em] text-white/70">
                    Event date
                  </span>
                  <time
                    dateTime={dateOnly || undefined}
                    className="block truncate text-xs font-bold sm:text-sm"
                  >
                    <span className="sm:hidden">
                      {formatEventDateShort(event.date)}
                    </span>
                    <span className="hidden sm:inline">
                      {formatEventDateLong(event.date)}
                    </span>
                  </time>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-7 max-w-4xl sm:mt-9">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/50 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-amber-500 dark:bg-amber-400"
            />
            <Sparkles className="size-3.5" aria-hidden />
            TogetherWe Community Initiative
          </p>

          <h1
            id="event-title"
            className="mt-4 text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-balance text-foreground [overflow-wrap:anywhere]"
          >
            {event.title}
          </h1>
        </div>

        {hasFacts && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {event.date && (
              <FactCard icon={CalendarDays} label="Event date">
                <time dateTime={dateOnly || undefined}>
                  {formatEventDateMedium(event.date)}
                </time>
              </FactCard>
            )}
            {event.location && (
              <FactCard icon={MapPin} label="Location">
                {event.location}
              </FactCard>
            )}
            {event.type && (
              <FactCard icon={Tag} label="Category">
                {event.type}
              </FactCard>
            )}
          </ul>
        )}
      </header>

      <div className="mt-9 grid gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AboutCard description={event.description} />

          {highlights.length > 0 && (
            <HighlightsCard highlights={highlights} />
          )}

          {hasOrganizer && <OrganizerCard event={event} />}
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24">
          <JoinCard event={event} />
        </aside>
      </div>
    </>
  );
}

function EventNotFound() {
  return (
    <div className="mx-auto mt-10 max-w-2xl sm:mt-14">
      <div className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card px-6 py-12 text-center shadow-xl shadow-primary/[0.06] sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-secondary/60 blur-3xl dark:bg-emerald-400/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-primary/10 dark:border-emerald-400/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/3 size-56 rounded-full bg-accent/5 blur-3xl"
        />

        <div className="relative">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/15 bg-secondary/60 text-primary shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            <CalendarX2 className="size-7" aria-hidden />
          </span>

          <p className="mt-5 inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary dark:text-emerald-400">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-amber-500 dark:bg-amber-400"
            />
            Event unavailable
          </p>

          <h1
            id="event-not-found-heading"
            className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-balance text-foreground sm:text-4xl"
          >
            We Couldn&apos;t Find This Event
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            The event may have ended, been removed, or the link might be
            incorrect. Explore upcoming events to find another way to make a
            difference.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/upcomingEvents"
              className={buttonVariants({
                size: "lg",
                className:
                  "group h-11 w-full rounded-xl px-5 text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl sm:w-auto",
              })}
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden
              />
              Back to Upcoming Events
            </Link>

            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "h-11 w-full rounded-xl border-primary/20 bg-card/70 px-5 text-sm font-semibold text-primary shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground hover:shadow-md sm:w-auto dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200",
              })}
            >
              <Home className="size-4" aria-hidden />
              Go to Homepage
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Small actions still make a meaningful difference.
          </p>
        </div>
      </div>
    </div>
  );
}

const EventDetailsPage = async ({
  params,
}: PageProps<"/upcomingEvents/[id]">) => {
  const { id } = await params;
  const event = await getEvent(id);

  return (
    <section
      aria-labelledby={event ? "event-title" : "event-not-found-heading"}
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <BackgroundDecor />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24 lg:pt-12">
        <TopNavigation />

        {event ? <EventContent event={event} /> : <EventNotFound />}
      </div>
    </section>
  );
};

export default EventDetailsPage;
