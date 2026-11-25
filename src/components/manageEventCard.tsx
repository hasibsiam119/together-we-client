'use client'
import {
    CalendarDays,
    ImageOff,
    MapPin,
    
    Sparkles,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatEventDate, toDateOnly } from "@/lib/events";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UpdateEventPage from "./editEvent";

export type ManageEvent = {
    _id?: string;
    id?: string;
    title: string;
    type?: string;
    date: string;
    location?: string;
    thumbnail?: string;
    description?: string;
};

type ManageEventCardProps = {
    event: ManageEvent;

    isDeleting?: boolean;
};

const ManageEventCard = ({
    event,

    isDeleting = false,
}: ManageEventCardProps) => {
    const hasImage = Boolean(event.thumbnail);
    const dateOnly = toDateOnly(event.date);
    const dateLabel = dateOnly ? formatEventDate(dateOnly) : event.date;
    const route = useRouter()

    const handleCancel = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event._id ?? event.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`Deletation failed: ${res.status}`);
            }

            toast.success("Event Deleted successfully");
             route.refresh()

        } catch (error) {
            console.error(error);
            toast.error("Unable to Delete. Please try again.");
        }
    };

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.07] md:flex-row">
            {/* Event Image */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted md:h-auto md:w-56 lg:w-64">
                {hasImage ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            loading="lazy"
                            decoding="async"
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

                {event.type && (
                    <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-foreground shadow-sm ring-1 ring-black/5 backdrop-blur">
                        <Sparkles className="size-3.5 shrink-0" aria-hidden />
                        <span className="truncate">{event.type}</span>
                    </span>
                )}
            </div>

            {/* Event Information */}
            <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300">
                    <Sparkles className="size-3.5" aria-hidden />
                    You are the organizer
                </span>

                <h2 className="mt-3 font-heading text-xl leading-snug font-bold tracking-[-0.02em] text-foreground md:text-2xl">
                    <span className="line-clamp-2">{event.title}</span>
                </h2>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {dateLabel && (
                        <div className="flex items-center gap-2">
                            <CalendarDays
                                className="size-4 shrink-0 text-primary/70 dark:text-emerald-400/70"
                                aria-hidden
                            />
                            <span>
                                <span className="sr-only">Date: </span>
                                {dateLabel}
                            </span>
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-center gap-2">
                            <MapPin
                                className="size-4 shrink-0 text-primary/70 dark:text-emerald-400/70"
                                aria-hidden
                            />
                            <span className="line-clamp-1">
                                <span className="sr-only">Location: </span>
                                {event.location}
                            </span>
                        </div>
                    )}
                </div>

                {event.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {event.description}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t border-border/70 p-4 md:w-44 md:flex-col md:items-stretch md:justify-center md:border-t-0 md:border-l md:p-5">
              <UpdateEventPage event={event}></UpdateEventPage>

                <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={isDeleting}
                    aria-busy={isDeleting}
                    aria-label={`Delete event: ${event.title}`}
                    variant="outline"
                    className="h-10 flex-1 rounded-lg border-red-300 bg-card px-4 text-sm font-semibold text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-700 md:flex-none dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"
                >
                    <Trash2 className="size-4" aria-hidden />
                    {isDeleting ? "Deleting…" : "Delete"}
                </Button>
            </div>
        </article>
    );
};

export default ManageEventCard;
