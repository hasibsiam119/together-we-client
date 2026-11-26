'use client'

import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import {
    CalendarDays,
    CalendarX2,
    CheckCircle2,
    MapPin,
    ArrowRight,
    Eye,
    X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";




const manrope = Manrope({ subsets: ["latin"] });

type JoinedEvent = {
    _id: string;
    name: string;
    email: string;
    id: string;
    title: string;
    type: string;
    date: string;
    location: string;
    thumbnail: string;
    description: string;
    organizerName: string;
    organizerEmail: string;
    organizerImage: string;
};

const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const JoinedEventPage = () => {
  
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!user?.email) {
            Promise.resolve().then(() => setLoading(false));
            return;
        }

        const controller = new AbortController();

        const getJoinedEvents = async () => {
           const token = await getTokenFromClient()
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/joined/${encodeURIComponent(user.email)}`,
                    { signal: controller.signal,
                        headers:{
                            authorization:`Bearer ${token}`
                        }

                     }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data: JoinedEvent[] = await res.json();

                const sortedData = [...data].sort(
                    (a, b) =>
                        new Date(a.date).getTime() -
                        new Date(b.date).getTime()
                );

                setJoinedEvents(sortedData);

            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setError("Unable to load joined events.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        getJoinedEvents();

        return () => controller.abort();

    }, [user?.email, isPending]);

    if (isPending || loading) {
        return (
            <div className={`${manrope.className} flex min-h-screen items-center justify-center bg-[#F8FAF7] px-4 dark:bg-[#111C16]`}>
                <p className="text-center text-sm font-semibold text-green-700 sm:text-base dark:text-green-400">
                    Loading joined events...
                </p>
            </div>
        );
    }

    if (!user?.email) {
        return null;
    }
   
    const handleCancel = async (joinedId:string) => {
        const token = await getTokenFromClient()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined/${joinedId}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Cancellation failed: ${res.status}`);
            }

            toast.error("cancelled successfully");
            setJoinedEvents((prev) => prev.filter((e) => e._id !== joinedId));
        } catch (error) {
            console.error(error);
            toast.error("Unable to cancel. Please try again.");
        }
    };

    return (
        <main className={`${manrope.className} min-h-screen bg-[#F8FAF7] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#111C16]`}>

            <div className="mx-auto w-full max-w-6xl">

                {/* Page Header */}
                <div className="mb-8 sm:mb-10">

                    <p className="mb-2 text-xs font-bold tracking-wider text-green-700 sm:mb-3 sm:text-sm dark:text-green-400">
                        YOUR ACTIVITIES
                    </p>

                    <h1 className="mb-2 text-2xl font-extrabold text-[#172B22] sm:mb-3 sm:text-3xl lg:text-4xl dark:text-white">
                        Joined Events
                    </h1>

                    <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-base dark:text-gray-400">
                        Manage and keep track of the events you have joined.
                    </p>

                </div>

                {/* Event Count */}
                <div className="mb-6 flex items-center gap-3 sm:mb-7">

                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100 sm:size-12 dark:bg-green-900/40">
                        <CalendarDays className="size-5 text-green-700 sm:size-6 dark:text-green-400" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                            Total Joined Events
                        </p>

                        <p className="text-lg font-bold text-[#172B22] sm:text-xl dark:text-white">
                            {joinedEvents.length} Events
                        </p>
                    </div>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600 sm:p-4 sm:text-base dark:border-red-900 dark:bg-red-950/30">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && joinedEvents.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-10 dark:border-gray-700 dark:bg-[#1B2A21]">

                        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-green-100 sm:size-16 dark:bg-green-900/40">
                            <CalendarX2 className="size-7 text-green-700 sm:size-8 dark:text-green-400" />
                        </div>

                        <h2 className="mb-2 text-lg font-bold text-[#172B22] sm:text-xl dark:text-white">
                            No Events Joined Yet
                        </h2>

                        <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-gray-500 sm:text-base dark:text-gray-400">
                            You haven&apos;t joined any events yet. Explore upcoming events and become part of your community.
                        </p>

                        <Link
                            href="/upcomingEvents"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800 sm:w-auto"
                        >
                            Explore Events
                            <ArrowRight size={17} />
                        </Link>

                    </div>
                )}

                {/* Joined Events */}
                <div className="space-y-4 sm:space-y-5">

                    {joinedEvents.map((event) => (

                        <div
                            key={event._id}
                            className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-lg sm:gap-5 sm:p-5 md:flex-row md:gap-6 dark:border-gray-700 dark:bg-[#1B2A21]"
                        >

                            {/* Event Image */}
                            <div className="h-44 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-52 md:h-36 md:w-48 lg:h-40 lg:w-64 dark:bg-gray-800">

                                {/* Event thumbnails are remote URLs, so a plain img keeps host configuration simple. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="h-full w-full object-cover"
                                />

                            </div>

                            {/* Event Information */}
                            <div className="min-w-0 flex-1">

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    <CheckCircle2 size={14} />
                                    Joined
                                </span>

                                <h2 className="mt-3 text-lg font-bold leading-snug text-[#172B22] sm:text-xl md:text-2xl dark:text-white">
                                    {event.title}
                                </h2>

                                <div className="mt-3 space-y-2 text-sm text-gray-500 sm:mt-4 dark:text-gray-400">

                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span className="min-w-0">Date: {formatEventDate(event.date)}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span className="min-w-0 line-clamp-1">{event.location}</span>
                                    </div>

                                </div>

                                <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2 dark:text-gray-400">
                                    {event.description}
                                </p>

                            </div>

                            {/* Actions */}
                            <div className="mt-1 grid grid-cols-2 gap-2 md:mt-0 md:flex md:w-auto md:self-end">

                                <button
                                    onClick={() => handleCancel(event._id)}
                                    type="button"
                                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 md:w-auto dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/30"
                                >
                                    <X size={15} />
                                    Cancel
                                </button>

                                <Link
                                    href={`/upcomingEvents/${event.id}`}
                                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800 md:w-auto"
                                >
                                    <Eye size={15} />
                                    View
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
};

export default JoinedEventPage;
