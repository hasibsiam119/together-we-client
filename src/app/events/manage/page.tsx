import Link from "next/link";
import { CalendarDays, CalendarPlus, CalendarX2, Plus } from "lucide-react";

import ManageEventCard, {
    type ManageEvent,
} from "@/components/manageEventCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManageEventPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const email = session?.user?.email;

    if (!email) return null;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/user/${encodeURIComponent(email)}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return <p>Failed to Load events</p>;
    }

    const data = await res.json();

    const events: ManageEvent[] = Array.isArray(data) ? data : [];

    return (
        <main className="min-h-screen bg-background px-4 py-12">
            <div className="mx-auto max-w-6xl">
                {/* Page Header */}
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-bold tracking-wider text-primary dark:text-emerald-400">
                            YOUR EVENTS
                        </p>

                        <h1 className="mb-3 font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                            Manage Events
                        </h1>

                        <p className="text-muted-foreground">
                            Review, edit, or remove the events you have created for
                            the community.
                        </p>
                    </div>

                    <Link
                        href="/events/create"
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl"
                    >
                        <Plus className="size-4" aria-hidden />
                        Create Event
                    </Link>
                </div>

                {/* Event Count */}
                <div className="mb-7 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-secondary dark:bg-emerald-400/10">
                        <CalendarDays
                            className="text-primary dark:text-emerald-400"
                            aria-hidden
                        />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Created Events
                        </p>

                        <p className="text-xl font-bold text-foreground">
                            {events.length} {events.length === 1 ? "Event" : "Events"}
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                {events.length === 0 ? (
                    <div className="rounded-2xl border border-border/80 bg-card p-10 text-center">
                        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-secondary dark:bg-emerald-400/10">
                            <CalendarX2
                                className="text-primary dark:text-emerald-400"
                                size={30}
                                aria-hidden
                            />
                        </div>

                        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
                            No Events Created Yet
                        </h2>

                        <p className="mb-6 text-muted-foreground">
                            You haven&apos;t created any events yet. Start one and
                            bring your community together.
                        </p>

                        <Link
                            href="/events/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-[#14532d]"
                        >
                            <CalendarPlus className="size-4" aria-hidden />
                            Create Your First Event
                        </Link>
                    </div>
                ) : (
                    /* Managed Events */
                    <div className="space-y-5">
                        {events.map((event, index) => (
                            <ManageEventCard
                                key={event._id ?? event.id ?? index}
                                event={event}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ManageEventPage;