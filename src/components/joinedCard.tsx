"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  HeartHandshake,
  MapPin,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { formatEventDateMedium, type EventDetails } from "@/lib/events";

export default function JoinCard({ event }: { event: EventDetails }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isJoining, setIsJoining] = useState(false);

  const rows: { icon: LucideIcon; label: string; value: string }[] = [];

  if (event.date) {
    rows.push({
      icon: CalendarDays,
      label: "Date",
      value: formatEventDateMedium(event.date),
    });
  }

  if (event.location) {
    rows.push({ icon: MapPin, label: "Location", value: event.location });
  }

  if (event.type) {
    rows.push({ icon: Tag, label: "Category", value: event.type });
  }

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please sign in to join this event.");
      return;
    }

    if (isJoining) {
      return;
    }

    const data = {
      name: user.name,
      email: user.email,
      ...event,
    };

    try {
      setIsJoining(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Join request failed: ${res.status}`);
      }

      toast.success("Joined successfully!");
    } catch (error) {
      console.error("Failed to join event:", error);
      toast.error("Couldn't join this event. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <section
      aria-labelledby="join-event-heading"
      className="relative overflow-hidden rounded-[26px] border border-primary/10 bg-card shadow-xl shadow-primary/[0.07]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_85%_110%_at_50%_0%,var(--secondary),transparent_76%)] dark:bg-[radial-gradient(ellipse_85%_110%_at_50%_0%,rgba(16,185,129,0.14),transparent_76%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full border border-primary/10 dark:border-emerald-400/10"
      />

      <div className="relative p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300">
          <HeartHandshake className="size-3.5" aria-hidden />
          Make an impact
        </span>

        <h2
          id="join-event-heading"
          className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-foreground"
        >
          Be Part of the Change
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Your participation can help make this community initiative
          successful.
        </p>

        {rows.length > 0 ? (
          <ul className="mt-5 space-y-3 border-y border-border/70 py-5">
            {rows.map((row) => {
              const Icon = row.icon;

              return (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-primary/10 bg-background text-primary dark:border-emerald-400/15 dark:text-emerald-400">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="mt-0.5 block break-words text-sm font-semibold leading-5 text-foreground">
                      {row.value}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-5 border-y border-border/70 py-5 text-sm leading-6 text-muted-foreground">
            More event details will be shared soon.
          </p>
        )}

        <Button
          type="button"
          onClick={handleJoin}
          disabled={isJoining}
          aria-busy={isJoining}
          className="group/join mt-5 h-12 w-full rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:translate-y-0 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
        >
          {isJoining ? "Joining…" : "Join This Event"}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover/join:translate-x-1"
            aria-hidden
          />
        </Button>

        <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-[0.7rem] leading-5 text-muted-foreground">
          <Heart
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 fill-current text-amber-500 dark:text-amber-400"
          />
          Together, small actions create meaningful impact.
        </p>
      </div>
    </section>
  );
}
