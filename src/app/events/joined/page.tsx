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
                    `${ process.env.NEXT_PUBLIC_API_URL }/joined/${ encodeURIComponent(user.email) } `,
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
            <div className={`${ manrope.className } min - h - screen flex items - center justify - center bg - [#F8FAF7] dark: bg - [#111C16]`}>
                <p className="text-green-700 dark:text-green-400 font-semibold">
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
        <main className={`${ manrope.className } min - h - screen bg - [#F8FAF7] dark: bg - [#111C16] py - 12 px - 4`}>

            <div className="max-w-6xl mx-auto py-10">

                {/* Page Header */}
                <div className="mb-10">

                    <p className="text-sm font-bold tracking-wider text-green-700 dark:text-green-400 mb-3">
                        YOUR ACTIVITIES
                    </p>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#172B22] dark:text-white mb-3">
                        Joined Events
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400">
                        Manage and keep track of the events you have joined.
                    </p>

                </div>

                {/* Event Count */}
                <div className="flex items-center gap-3 mb-7">

                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <CalendarDays className="text-green-700 dark:text-green-400" />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Joined Events
                        </p>

                        <p className="text-xl font-bold text-[#172B22] dark:text-white">
                            {joinedEvents.length} Events
                        </p>
                    </div>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-4 text-red-600">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && joinedEvents.length === 0 && (
                    <div className="bg-white dark:bg-[#1B2A21] border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center">

                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-5">
                            <CalendarX2 className="text-green-700 dark:text-green-400" size={30} />
                        </div>

                        <h2 className="text-xl font-bold text-[#172B22] dark:text-white mb-2">
                            No Events Joined Yet
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            You haven&apos;t joined any events yet. Explore upcoming events and become part of your community.
                        </p>

                        <Link
                            href="/upcomingEvents"
                            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold transition"
                        >
                            Explore Events
                            <ArrowRight size={17} />
                        </Link>

                    </div>
                )}

                {/* Joined Events */}
                <div className="space-y-5">

                    {joinedEvents.map((event) => (

                        <div
                            key={event._id}
                            className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-lg md:flex-row md:gap-6 md:p-5 dark:border-gray-700 dark:bg-[#1B2A21]"
                        >

                            {/* Event Image */}
                            <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 md:h-36 md:w-56 lg:h-40 lg:w-64 dark:bg-gray-800">

                                {/* Event thumbnails are remote URLs, so a plain img keeps host configuration simple. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={event.thumbnail}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            {/* Event Information */}
                            <div className="min-w-0 flex-1">

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    <CheckCircle2 size={14} />
                                    Joined
                                </span>

                                <h2 className="mt-3 text-xl md:text-2xl font-bold leading-snug text-[#172B22] dark:text-white">
                                    {event.title}
                                </h2>

                                <div className="mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">

                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span>Date: {formatEventDate(event.date)}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span className="line-clamp-1">{event.location}</span>
                                    </div>

                                </div>

                                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {event.description}
                                </p>

                            </div>

                            {/* Actions */}
                            <div className="flex w-full items-center gap-2 md:w-auto md:self-end">

                                <button
                                    onClick={() => handleCancel(event._id)}
                                    type="button"
                                    className="flex flex-1 md:flex-none items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/30"
                                >
                                    <X size={15} />
                                    Cancel
                                </button>

                                <Link
                                    href={`/upcomingEvents/${event.id}`}
                                    className="flex flex-1 md:flex-none items-center justify-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
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
