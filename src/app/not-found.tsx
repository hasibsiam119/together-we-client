import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { Compass, Home } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "404 – Page Not Found | TogetherWe",
  description:
    "The page you're looking for doesn't exist or may have been moved.",
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className={`${manrope.className} relative isolate flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-24 lg:py-28`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--secondary),transparent_70%)]"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -left-24 top-12 -z-10 size-72 rounded-full bg-primary/10 blur-3xl sm:size-80"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -right-20 bottom-8 -z-10 size-64 rounded-full bg-accent/10 blur-3xl [animation-delay:-7s] sm:size-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-16 -z-10 hidden size-40 opacity-30 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:18px_18px] md:block"
      />

      <div className="mx-auto w-full max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur dark:border-emerald-400/20 dark:text-emerald-300">
          <Compass aria-hidden className="size-4" />
          Lost in the community?
        </span>

        <p
          aria-hidden
          className="mt-6 font-heading text-[clamp(5rem,20vw,10rem)] font-bold leading-none tracking-[-0.05em]"
        >
          <span className="relative inline-block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-400 dark:to-amber-300">
            404
            <svg
              aria-hidden
              viewBox="0 0 220 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-accent/70"
            >
              <path
                d="M2 9C52 3 156 2 218 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </p>

        <h1
          id="not-found-heading"
          className="mt-5 text-[clamp(1.6rem,4vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-balance text-foreground"
        >
          Oops! Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className:
                "group h-11 rounded-xl px-6 text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 sm:text-base",
            })}
          >
            <Home className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
