import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-label="Loading, please wait"
      className={`${manrope.className} relative isolate flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--secondary),transparent_70%)]"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -left-20 top-16 -z-10 size-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -right-16 bottom-10 -z-10 size-56 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]"
      />

      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card/80 px-6 py-12 text-center shadow-sm backdrop-blur-sm sm:px-10">
        <div className="relative mx-auto flex size-20 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-4 border-secondary dark:border-emerald-400/15"
          />
          <span
            aria-hidden
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-accent motion-reduce:animate-none dark:border-t-emerald-400 dark:border-r-amber-300"
          />
          <span
            aria-hidden
            className="size-3.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none dark:bg-emerald-400"
          />
        </div>

        <p className="mt-8 text-lg font-bold tracking-[-0.01em] text-foreground sm:text-xl">
          Loading, please wait...
        </p>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          We&rsquo;re gathering the latest community updates for you. This will
          only take a moment.
        </p>

        <div aria-hidden className="mt-6 flex items-center justify-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-2 animate-bounce rounded-full bg-primary/70 motion-reduce:animate-none dark:bg-emerald-400/70"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
