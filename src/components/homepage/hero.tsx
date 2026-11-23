import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarCheck2,
    HandHeart,
    Heart,
    Plus,

    Users,
} from "lucide-react";


import { buttonVariants } from "@/components/ui/button";
const stats = [
    {
        value: "1,450+",
        label: "Active Volunteers",
        icon: Users,
        accent: "text-primary dark:text-emerald-400",
        iconAccent:
            "bg-primary/10 text-primary dark:bg-emerald-400/10 dark:text-emerald-400",
    },
    {
        value: "180+",
        label: "Events Completed",
        icon: CalendarCheck2,
        accent: "text-amber-600 dark:text-amber-300",
        iconAccent:
            "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
    },
    {
        value: "24,000+",
        label: "Lives Impacted",
        icon: Heart,
        accent: "text-teal-700 dark:text-teal-300",
        iconAccent:
            "bg-teal-600/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300",
    },
    {
        value: "100%",
        label: "Community Driven",
        icon: HandHeart,
        accent: "text-lime-700 dark:text-lime-300",
        iconAccent:
            "bg-lime-600/10 text-lime-700 dark:bg-lime-400/10 dark:text-lime-300",
    },
];

const Hero = () => {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate overflow-hidden bg-background"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,var(--secondary),transparent_70%)]"
            />
            <div
                aria-hidden
                className="animate-hero-float pointer-events-none absolute -left-24 top-8 -z-10 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96"
            />
            <div
                aria-hidden
                className="animate-hero-float pointer-events-none absolute -right-20 top-32 -z-10 size-64 rounded-full bg-accent/10 blur-3xl [animation-delay:-5s] sm:size-80"
            />
            <div
                aria-hidden
                className="animate-hero-float pointer-events-none absolute -bottom-10 left-1/3 -z-10 size-72 rounded-full bg-secondary/70 blur-3xl [animation-delay:-9s] dark:bg-primary/10"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute right-8 top-24 -z-10 hidden size-40 opacity-30 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:18px_18px] md:block"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-24 left-10 -z-10 hidden size-24 rounded-full border border-primary/10 lg:block"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-32 left-16 -z-10 hidden size-12 rounded-full border border-accent/20 lg:block"
            />

            <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
                        <span className="animate-hero-fade-up inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-primary/15 bg-card/80 px-3 py-1 text-center text-[0.55rem] font-semibold uppercase leading-4 tracking-[0.14em] text-primary shadow-sm backdrop-blur sm:gap-2 sm:px-4 sm:py-1.5 sm:text-[0.65rem] sm:tracking-[0.18em] dark:border-emerald-400/20 dark:text-emerald-300">

                            <span>Community-driven social impact platform</span>
                        </span>

                        <h1
                            id="hero-heading"
                            className="animate-hero-fade-up mt-6 font-heading text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance"
                            style={{ animationDelay: "80ms" }}
                        >
                            <span className="block text-foreground">Small Actions.</span>
                            <span className="mt-1 block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-400 dark:to-amber-300">
                                Big Changes.
                            </span>
                        </h1>

                        <p
                            className="animate-hero-fade-up mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:mt-6 sm:leading-8 lg:mx-0"
                            style={{ animationDelay: "180ms" }}
                        >
                            Discover meaningful opportunities, connect with passionate
                            people, and make a real difference in your community.
                            Together, we can turn small actions into lasting change.
                        </p>

                        <div
                            className="animate-hero-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
                            style={{ animationDelay: "280ms" }}
                        >
                            <Link
                                href="/events"
                                className={buttonVariants({
                                    size: "lg",
                                    className:
                                        "group h-11 w-full rounded-xl px-6 text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 sm:w-auto sm:text-base",
                                })}
                            >
                                Explore Events
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/events/create"
                                className={buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                    className:
                                        "group h-11 w-full rounded-xl border-primary/20 bg-card/70 px-6 text-sm text-primary shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground hover:shadow-md sm:w-auto sm:text-base dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200",
                                })}
                            >
                                <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
                                Create an Event
                            </Link>
                        </div>
                    </div>

                    <div
                        className="animate-hero-fade-up relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
                        style={{ animationDelay: "160ms" }}
                    >
                        <div
                            aria-hidden
                            className="absolute inset-8 -z-10 rounded-full bg-primary/10 blur-3xl"
                        />
                        <Image
                            src="/Hero.png"
                            alt="TogetherWe community illustration with people, leaves, and a glowing heart"
                            width={1536}
                            height={1024}
                            priority
                            sizes="(min-width: 1024px) 45vw, 90vw"
                            className="h-auto w-full drop-shadow-xl"
                        />
                    </div>
                </div>

                <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <li
                                key={stat.label}
                                className="animate-hero-fade-up group flex h-full flex-col rounded-2xl border border-border/70 bg-card/75 p-4 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md sm:p-5"
                                style={{ animationDelay: `${380 + index * 80}ms` }}
                            >
                                <span
                                    className={`inline-flex size-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${stat.iconAccent}`}
                                >
                                    <Icon className="size-4" />
                                </span>
                                <p
                                    className={`mt-4 font-heading text-2xl font-bold tracking-tight tabular-nums sm:text-3xl ${stat.accent}`}
                                >
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                                    {stat.label}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Hero;