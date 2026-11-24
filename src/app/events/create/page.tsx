"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  ChevronDown,
  HeartHandshake,
  Image as ImageIcon,
  Info,
  Lock,
  MapPin,
  Send,
  Snowflake,
  Sparkles,
  Tags,
  Trash2,
  TreePine,
  Type as TypeIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Education",
  "Healthcare",
  "Community Support",
  "Other",
];

const thumbnailIdeas = [
  {
    label: "Winter Clothes",
    icon: Snowflake,
    gradient: "from-sky-500/20 via-sky-400/10 to-transparent",
    accent: "text-sky-700 dark:text-sky-300",
    chip: "border-sky-500/20 bg-sky-500/5 text-sky-700 hover:bg-sky-500/10 dark:text-sky-300",
  },
  {
    label: "Blanket Relief",
    icon: HeartHandshake,
    gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
    accent: "text-amber-700 dark:text-amber-300",
    chip: "border-amber-500/20 bg-amber-500/5 text-amber-700 hover:bg-amber-500/10 dark:text-amber-300",
  },
  {
    label: "Cleanup",
    icon: Trash2,
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
    accent: "text-emerald-700 dark:text-emerald-300",
    chip: "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-300",
  },
  {
    label: "Tree Plantation",
    icon: TreePine,
    gradient: "from-lime-500/20 via-emerald-400/10 to-transparent",
    accent: "text-lime-700 dark:text-lime-300",
    chip: "border-lime-500/20 bg-lime-500/5 text-lime-700 hover:bg-lime-500/10 dark:text-lime-300",
  },
];

const inputClasses =
  "peer h-12 w-full rounded-xl border border-border bg-background/70 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/25 focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";

function Field({
  id,
  label,
  required,
  helper,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-destructive">
            *
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {helper && (
        <p
          id={`${id}-help`}
          className="mt-1.5 text-xs leading-5 text-muted-foreground"
        >
          {helper}
        </p>
      )}
    </div>
  );
}

function getMinEventDate() {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${tomorrow.getFullYear()}-${month}-${day}`;
}

const CreateEventPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const dateInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const [activeIdea, setActiveIdea] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const descriptionLimit = 600;
  const descriptionProgress = Math.min(
    (description.length / descriptionLimit) * 100,
    100,
  );

  const displayName = user?.name?.trim() || "TogetherWe Member";
  const displayEmail =
    user?.email?.trim() || "Sign in to display your account email";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "TW";

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = getMinEventDate();
    }
  }, []);

  const selectedIdea = thumbnailIdeas.find((idea) => idea.label === activeIdea);
  const SelectedIdeaIcon = selectedIdea?.icon;

  const hasPreview = Boolean(thumbnailUrl.trim()) && !imageFailed;
  const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-event`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      console.log(data)
      if (!res.ok) {
        throw new Error(data?.message || "Failed to add destination");
      }

      router.push("/upcomingEvents");
      router.refresh();
        
    }

  return (
    <section
      aria-labelledby="create-event-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_100%_0%,var(--secondary),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/3 -z-10 size-80 rounded-full bg-primary/5 blur-3xl dark:bg-emerald-400/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-24 -z-10 hidden size-40 opacity-20 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -right-24 bottom-40 -z-10 hidden size-72 rounded-full border border-primary/10 lg:block dark:border-emerald-400/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-24 top-40 -z-10 hidden size-14 rotate-12 rounded-2xl border border-accent/25 lg:block"
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2.5 rounded-full text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-emerald-400"
        >
          <span className="grid size-8 place-items-center rounded-full border border-border bg-card shadow-sm transition-all duration-200 group-hover:-translate-x-0.5 group-hover:border-primary/25 group-hover:text-primary dark:group-hover:text-emerald-400">
            <ArrowLeft className="size-4" />
          </span>
          Back to Upcoming Events
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/50 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Create Something Meaningful
          </p>

          <h1
            id="create-event-heading"
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-balance text-foreground"
          >
            Bring Your{" "}
            <span className="relative inline-block text-primary dark:text-emerald-400">
              Community Together.
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
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Create a local initiative, invite volunteers, and turn your ideas
            into meaningful community impact.
          </p>
        </header>

        <form
          className="mt-9 overflow-hidden rounded-[24px] border border-primary/10 bg-card shadow-xl shadow-primary/[0.06]"
          onSubmit={onSubmit}
        >
          <div className="relative border-b border-border/70 px-5 py-6 sm:px-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_120%_at_0%_0%,var(--secondary),transparent_70%)]"
            />

            <div className="relative flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <CalendarDays className="size-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                  Event Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Tell us about the initiative you want to organize.
                </p>
              </div>
              <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary backdrop-blur sm:inline-flex dark:border-emerald-400/20 dark:text-emerald-400">
                <Sparkles className="size-3.5" />
                Local impact
              </span>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Field
                id="title"
                label="Event Title"
                required
                helper="Keep it clear and specific so volunteers know what to expect."
                className="sm:col-span-2"
              >
                <div className="relative">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    aria-describedby="title-help"
                    placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                    className={`${inputClasses} pl-11 pr-4`}
                  />
                  <TypeIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60 transition-colors peer-focus:text-primary" />
                </div>
              </Field>

              <Field id="type" label="Event Type" required>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className={`${inputClasses} cursor-pointer appearance-none pl-11 pr-10`}
                  >
                    <option value="" disabled>
                      Select an event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <Tags className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                </div>
              </Field>

              <Field
                id="date"
                label="Event Date"
                required
                helper="Choose a future date for your initiative."
              >
                <div className="relative">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    ref={dateInputRef}
                    aria-describedby="date-help"
                    className={`${inputClasses} cursor-pointer pl-11 pr-4 dark:[color-scheme:dark]`}
                  />
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                </div>
              </Field>

              <Field
                id="location"
                label="Location / Venue"
                required
                className="sm:col-span-2"
              >
                <div className="relative">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                    className={`${inputClasses} pl-11 pr-4`}
                  />
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60 transition-colors peer-focus:text-primary" />
                </div>
              </Field>

              <Field
                id="thumbnail"
                label="Thumbnail Image URL"
                helper="Paste a direct image link. Leave blank to publish with a default cover."
                className="sm:col-span-2"
              >
                <div className="relative">
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    inputMode="url"
                    aria-describedby="thumbnail-help"
                    placeholder="https://example.com/event-image.jpg"
                    value={thumbnailUrl}
                    onChange={(event) => {
                      setThumbnailUrl(event.target.value);
                      setImageFailed(false);
                    }}
                    className={`${inputClasses} pl-11 pr-4`}
                  />
                  <ImageIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60 transition-colors peer-focus:text-primary" />
                </div>

                {thumbnailUrl.trim() && imageFailed && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                    <Info className="size-3.5" />
                    We couldn&apos;t load that image. Check the URL and try again.
                  </p>
                )}

                <div className="mt-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Need inspiration?
                  </p>
                  <div
                    role="group"
                    aria-label="Thumbnail inspiration"
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {thumbnailIdeas.map((idea) => {
                      const Icon = idea.icon;
                      const isSelected = activeIdea === idea.label;

                      return (
                        <button
                          key={idea.label}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setActiveIdea(isSelected ? null : idea.label)
                          }
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${idea.chip} ${
                            isSelected
                              ? "ring-2 ring-primary/20 ring-offset-1 ring-offset-card"
                              : ""
                          }`}
                        >
                          <Icon className="size-3.5" />
                          {idea.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-border/80 bg-muted/20">
                  {hasPreview ? (
                    <div className="relative aspect-[16/8] w-full sm:aspect-[16/6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnailUrl}
                        alt="Event thumbnail preview"
                        className="size-full object-cover"
                        onError={() => setImageFailed(true)}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                      />
                      <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                        <Camera className="size-3" />
                        Thumbnail preview
                      </span>
                    </div>
                  ) : selectedIdea && SelectedIdeaIcon ? (
                    <div
                      className={`relative flex w-full flex-col items-center justify-center gap-2 bg-gradient-to-br px-6 py-8 sm:aspect-[16/6] ${selectedIdea.gradient}`}
                    >
                      <span
                        className={`grid size-12 place-items-center rounded-2xl border border-primary/15 bg-card/60 shadow-sm ${selectedIdea.accent}`}
                      >
                        <SelectedIdeaIcon className="size-6" />
                      </span>
                      <p className="text-sm font-bold text-foreground">
                        {selectedIdea.label}
                      </p>
                      <p className="max-w-xs text-center text-xs leading-5 text-muted-foreground">
                        Visual inspiration for your event cover. Replace it
                        with your own image URL above.
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-8 text-center sm:aspect-[16/6]">
                      <span className="grid size-11 place-items-center rounded-2xl border border-primary/15 bg-secondary/40 text-primary dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                        <Camera className="size-5" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        Image preview
                      </p>
                      <p className="max-w-sm text-xs leading-5 text-muted-foreground">
                        Paste an image URL or pick an inspiration theme to see
                        how your event cover could look.
                      </p>
                    </div>
                  )}
                </div>
              </Field>

              <Field
                id="description"
                label="Event Description"
                required
                className="sm:col-span-2"
              >
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    maxLength={descriptionLimit}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Explain the purpose of the event, volunteers required, items being distributed, and activities planned..."
                    className={`${inputClasses} min-h-40 resize-y py-3.5 pl-11 pr-4`}
                  />
                  <Info className="pointer-events-none absolute left-4 top-4 size-4 text-muted-foreground/60" />
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-xs leading-5 text-muted-foreground">
                    Share the goal, who it helps, and how volunteers can
                    contribute.
                  </p>
                  <span
                    className={`shrink-0 text-xs font-medium tabular-nums ${
                      description.length >= descriptionLimit
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {description.length}/{descriptionLimit}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className={`h-full rounded-full transition-[width] duration-300 ${
                      description.length >= descriptionLimit
                        ? "bg-destructive"
                        : "bg-primary"
                    }`}
                    style={{ width: `${descriptionProgress}%` }}
                  />
                </div>
              </Field>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-secondary/40 p-4 sm:p-5 dark:bg-emerald-500/10">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-card text-primary ring-1 ring-primary/10 dark:text-emerald-400">
                  <HeartHandshake className="size-4" />
                </span>
                <div>
                  <h2 className="text-base font-bold tracking-[-0.01em] text-foreground">
                    Organizer Information
                  </h2>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    This event will be published under your TogetherWe profile.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/10 bg-card/70 p-3">
                <Avatar size="lg" className="size-12 ring-2 ring-card">
                  <AvatarImage src={user?.image || undefined} alt={displayName} />
                  <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {displayEmail}
                  </p>
                </div>

                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-primary/15 bg-secondary/60 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-primary sm:inline-flex dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                  <Lock className="size-3" />
                  Account linked
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] leading-5 text-muted-foreground">
                <Lock className="size-3 shrink-0" />
                Organizer details come from your account and can&apos;t be
                edited here.
              </p>
            </div>

            <div className="mt-8 border-t border-border/70 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="order-2 max-w-md text-xs leading-5 text-muted-foreground sm:order-1">
                  Your event will be visible to the TogetherWe community once
                  published.
                </p>
                <Button
                  type="submit"
                  className="group order-1 h-12 w-full rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:order-2 sm:w-auto dark:hover:bg-emerald-600"
                >
                  Publish Event
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[0.7rem] leading-5 text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                By publishing this event, you agree to provide accurate
                information about your community initiative.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
