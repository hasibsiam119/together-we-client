import { Manrope } from "next/font/google";
import {
  ArrowRight,
  HandHeart,
  Heart,
  HeartHandshake,
  Mail,
  Users,
} from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const Newsletter = () => {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-[#173d2c] text-white`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_60%_at_15%_0%,rgba(22,101,52,0.75),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_50%_at_100%_100%,rgba(245,158,11,0.12),transparent_60%)]"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -right-24 -top-32 -z-10 size-[30rem] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden
        className="animate-hero-float pointer-events-none absolute -bottom-40 left-1/4 -z-10 size-96 rounded-full bg-emerald-500/10 blur-3xl [animation-delay:-7s]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-8 top-16 -z-10 hidden size-40 opacity-20 [background-image:radial-gradient(circle,rgba(220,252,231,0.5)_1px,transparent_1px)] [background-size:20px_20px] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 right-10 -z-10 hidden size-14 rounded-full border border-[#f59e0b]/25 lg:block"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-8 lg:gap-14 lg:px-8 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#dcfce7] sm:text-[0.68rem]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#f59e0b]" />
            The TogetherWe Community
          </p>

          <h2
            id="newsletter-heading"
            className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.035em] text-balance text-white"
          >
            Good Things Happen When We{" "}
            <span className="relative inline-block text-[#dcfce7]">
              Stay Connected
              <svg
                aria-hidden
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-[#f59e0b]/70"
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

          <p className="mt-5 max-w-lg text-sm leading-6 text-emerald-50/70 sm:text-base sm:leading-7">
            Get inspiring community stories, upcoming volunteer opportunities,
            and meaningful ways to make a difference delivered straight to your
            inbox.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div aria-hidden className="flex -space-x-2.5">
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#173d2c] bg-[#dcfce7] text-[#166534]">
                <Heart className="size-4" />
              </span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#173d2c] bg-[#f59e0b] text-[#173d2c]">
                <HandHeart className="size-4" />
              </span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#173d2c] bg-emerald-600 text-white">
                <Users className="size-4" />
              </span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#173d2c] bg-white/10 text-[#dcfce7] ring-1 ring-white/10">
                <HeartHandshake className="size-4" />
              </span>
            </div>
            <p className="text-xs font-medium leading-5 text-emerald-50/60">
              Local people, connected by purpose.
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-labelledby="newsletter-form-heading"
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.05] to-emerald-400/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[#f59e0b]/10 blur-3xl"
          />

          <div className="relative flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#dcfce7] ring-1 ring-white/10">
              <Mail className="size-5" />
            </span>
            <div>
              <h3
                id="newsletter-form-heading"
                className="text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                Join Our Newsletter
              </h3>
              <p className="mt-0.5 text-sm text-emerald-50/60">
                Be part of something meaningful.
              </p>
            </div>
          </div>

          <div className="relative mt-6 flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Mail
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-emerald-50/40"
              />
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email address"
                aria-describedby="newsletter-privacy"
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0f2a1e]/60 pl-11 pr-4 text-sm text-white shadow-inner outline-none transition placeholder:text-emerald-50/45 focus:border-[#dcfce7]/60 focus:ring-2 focus:ring-[#dcfce7]/15"
              />
            </div>

            <button
              type="button"
              className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#dcfce7] px-6 text-sm font-semibold text-[#166534] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dcfce7] xl:w-auto"
            >
              Subscribe Now
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <p
            id="newsletter-privacy"
            className="relative mt-4 text-center text-xs leading-5 text-emerald-50/55"
          >
            No spam. Just good things happening in your community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
