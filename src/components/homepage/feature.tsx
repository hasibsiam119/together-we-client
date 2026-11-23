import { Manrope } from "next/font/google";
import {
  ArrowUpRight,
  CalendarDays,
  HandHeart,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const features = [
  {
    number: "01",
    title: "Community-Led Initiatives",
    description:
      "Turn your local ideas into meaningful community projects and bring people together.",
    icon: Users,
    card: "border-emerald-900/10 bg-emerald-50/70 hover:border-emerald-600/30 dark:border-emerald-400/15 dark:bg-emerald-400/5",
    iconBox:
      "bg-primary text-primary-foreground shadow-primary/25 dark:bg-emerald-500 dark:text-emerald-950",
    numberColor: "text-primary/45 dark:text-emerald-400/50",
    arrowColor: "text-primary dark:text-emerald-400",
  },
  {
    number: "02",
    title: "Effortless Participation",
    description:
      "Discover nearby volunteering opportunities and join initiatives that matter to you.",
    icon: HandHeart,
    card: "border-amber-900/10 bg-amber-50/70 hover:border-amber-500/40 dark:border-amber-400/15 dark:bg-amber-400/5",
    iconBox:
      "bg-accent text-accent-foreground shadow-accent/30 dark:bg-amber-400 dark:text-amber-950",
    numberColor: "text-amber-700/45 dark:text-amber-300/50",
    arrowColor: "text-amber-600 dark:text-amber-300",
  },
  {
    number: "03",
    title: "Trusted Organization",
    description:
      "Manage your initiatives and keep event information organized through a simple platform.",
    icon: ShieldCheck,
    card: "border-sky-900/10 bg-sky-50/70 hover:border-sky-500/40 dark:border-sky-400/15 dark:bg-sky-400/5",
    iconBox:
      "bg-sky-600 text-white shadow-sky-600/25 dark:bg-sky-400 dark:text-sky-950",
    numberColor: "text-sky-700/45 dark:text-sky-300/50",
    arrowColor: "text-sky-700 dark:text-sky-300",
  },
  {
    number: "04",
    title: "Never Miss an Opportunity",
    description:
      "Explore upcoming community events and find new ways to contribute.",
    icon: CalendarDays,
    card: "border-violet-900/10 bg-violet-50/70 hover:border-violet-500/40 dark:border-violet-400/15 dark:bg-violet-400/5",
    iconBox:
      "bg-violet-600 text-white shadow-violet-600/25 dark:bg-violet-400 dark:text-violet-950",
    numberColor: "text-violet-700/45 dark:text-violet-300/50",
    arrowColor: "text-violet-700 dark:text-violet-300",
  },
];

const Feature = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_85%_0%,var(--secondary),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 size-72 rounded-full bg-secondary/50 blur-3xl dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-0 -z-10 hidden size-48 opacity-25 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary dark:text-emerald-400">
              <span
                aria-hidden
                className="h-px w-7 bg-primary/40 dark:bg-emerald-400/40"
              />
              Why TogetherWe
            </p>

            <h2
              id="features-heading"
              className="mt-4 max-w-3xl text-[clamp(1.9rem,3.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.035em] text-balance text-foreground"
            >
              Good Things Happen When We{" "}
              <span className="relative inline-block text-primary dark:text-emerald-400">
                Come Together
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/70"
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
              .
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 lg:pb-1 lg:text-right">
            From discovering local opportunities to organizing meaningful
            initiatives, everything you need to create positive change starts
            here.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,1fr)] lg:gap-10">
          <aside
            aria-label="Our community approach"
            className="relative mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-b from-secondary/70 via-card/60 to-card/30 p-6 sm:p-8 lg:mx-0 lg:max-w-none dark:border-emerald-400/15 dark:from-emerald-400/[0.07] dark:via-card/40 dark:to-card/20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full border border-primary/10 dark:border-emerald-400/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full border border-primary/10 dark:border-emerald-400/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative flex size-24 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-primary/15 dark:border-emerald-400/20"
              />
              <span
                aria-hidden
                className="absolute inset-3 rounded-full border border-dashed border-primary/25 dark:border-emerald-400/25"
              />
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 dark:bg-emerald-500 dark:text-emerald-950">
                <HeartHandshake className="size-6" />
              </span>
              <span
                aria-hidden
                className="absolute right-0 top-3 size-3 rounded-full bg-accent shadow-sm"
              />
              <span
                aria-hidden
                className="absolute bottom-2 left-1 size-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              />
              <span
                aria-hidden
                className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-primary/40 dark:bg-emerald-400/40"
              />
            </div>

            <div className="relative mt-8">
              <h3 className="text-[clamp(1.75rem,2.6vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground">
                One Community.
                <span className="mt-1 block text-primary dark:text-emerald-400">
                  Endless Possibilities.
                </span>
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Every project starts with someone who cares. TogetherWe gives
                local people the space, tools, and connections to turn that
                care into visible change.
              </p>
            </div>

            <div className="relative mt-auto pt-8">
              <div
                aria-hidden
                className="h-px w-full bg-gradient-to-r from-primary/15 via-primary/10 to-transparent"
              />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm dark:bg-emerald-500 dark:text-emerald-950">
                  
                  Make an Impact
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Local people. Lasting change.
                </span>
              </div>
            </div>
          </aside>

          <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className={`group relative flex h-full flex-col rounded-[20px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${feature.card}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${feature.iconBox}`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span
                      className={`text-xs font-bold tracking-[0.16em] ${feature.numberColor}`}
                    >
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-auto flex justify-end pt-6">
                    <span
                      className={`inline-flex size-9 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:border-white/10 dark:bg-white/5 ${feature.arrowColor}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-r from-primary via-[#14532d] to-[#0f4224] px-6 py-7 text-primary-foreground shadow-lg shadow-primary/15 sm:mt-14 sm:px-8 sm:py-8 lg:mt-16 lg:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 right-16 size-40 rounded-full bg-accent/15 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur sm:size-14">
              <HeartHandshake className="size-6 sm:size-7" />
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold leading-snug tracking-tight sm:text-xl">
                Real Change Starts With People Like You.
              </p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/75">
                Discover an opportunity. Bring people together. Make a
                difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
