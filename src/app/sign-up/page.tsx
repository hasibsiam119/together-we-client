"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Eye,
  EyeOff,
  HandHeart,
  HeartHandshake,
  Image as ImageIcon,
  Lock,
  Mail,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const highlights = [
  { label: "Discover Local Events", icon: CalendarDays },
  { label: "Connect With Volunteers", icon: Users },
  { label: "Create Positive Impact", icon: Sparkles },
];

type FormFieldProps = {
  
  id: string;
  label: string;
  placeholder: string;
  icon: typeof User;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url";
  trailing?: ReactNode;
  hint?: string;
};


function FormField({
  id,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  autoComplete,
  inputMode,
  trailing,
  hint,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`peer h-12 w-full rounded-xl border border-border bg-card text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/25 focus:border-primary/55 focus:ring-4 focus:ring-primary/10 ${
            trailing ? "pl-11 pr-12" : "pl-11 pr-4"
          }`}
        />
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60 transition-colors peer-focus:text-primary" />
        {trailing}
      </div>
      {hint && (
        <p
          id={`${id}-hint`}
          className="mt-1.5 text-xs leading-5 text-muted-foreground"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.26-2.08 3.54-5.15 3.54-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.1-6.68-4.93H1.31v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.32 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.31a12 12 0 0 0 0 10.82l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.31 6.59l4.01 3.09C6.26 6.85 8.89 4.75 12 4.75z"
      />
    </svg>
  );
}

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      ...(image ? { image } : {}),
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message ?? "Unable to create your account.");
      return;
    }

    if (data) {
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        error.message ?? "Unable to continue with Google. Please try again.",
      );
    }
  };

  return (
    <section
      aria-labelledby="signup-heading"
      className={`${manrope.className} bg-background px-4 py-10 sm:px-6 lg:px-8 lg:py-14`}
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] border border-primary/10 bg-background shadow-2xl shadow-primary/[0.08] lg:grid-cols-[45%_55%]">
        <aside className="relative isolate overflow-hidden bg-[#173d2c] p-6 text-white sm:p-8 lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_65%_at_15%_0%,rgba(22,101,52,0.8),transparent_65%)]"
          />
          <div
            aria-hidden
            className="animate-hero-float pointer-events-none absolute -right-20 top-10 -z-10 size-64 rounded-full bg-emerald-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-hero-float pointer-events-none absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-[#f59e0b]/10 blur-3xl [animation-delay:-6s]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-10 top-10 -z-10 hidden size-24 rounded-full border border-white/10 lg:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-1/2 -z-10 hidden size-32 opacity-20 [background-image:radial-gradient(circle,rgba(220,252,231,0.5)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
          />

          <div className="relative flex h-full flex-col">
            <Link
              href="/"
              aria-label="TogetherWe home"
              className="inline-flex w-fit rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/5"
            >
              <Image
                src="/TogetherWe%20Community%20Logo.png"
                alt="TogetherWe"
                width={1933}
                height={814}
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <div className="mt-8 lg:mt-12">
              <p className="max-w-md text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-white">
                Be Part of{" "}
                <span className="text-[#dcfce7]">Something Bigger.</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/70">
                Join a community of passionate people who believe small actions
                can create meaningful change.
              </p>
            </div>

            <ul className="mt-8 hidden space-y-3 lg:block">
              {highlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <li
                    key={highlight.label}
                    className="flex items-center gap-3 text-sm text-emerald-50/80"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-[#dcfce7]">
                      <Icon className="size-4" />
                    </span>
                    {highlight.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 hidden flex-1 items-center justify-center lg:flex">
              <div className="relative aspect-square w-full max-w-[18rem]">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-emerald-400/10 blur-3xl"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-white/10"
                />
                <div
                  aria-hidden
                  className="absolute inset-6 rounded-full border border-dashed border-white/10"
                />
                <div
                  aria-hidden
                  className="absolute inset-14 rounded-full border border-white/10"
                />

                <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] bg-[#dcfce7] text-[#166534] shadow-2xl shadow-black/25">
                  <HeartHandshake className="size-10" />
                </div>

                <span className="absolute left-1/2 top-1 grid size-12 -translate-x-1/2 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#dcfce7] backdrop-blur">
                  <CalendarDays className="size-5" />
                </span>
                <span className="absolute right-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-[#f59e0b] text-[#173d2c] shadow-lg">
                  <Users className="size-5" />
                </span>
                <span className="absolute bottom-1 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-2xl border border-white/10 bg-emerald-500 text-white shadow-lg">
                  <HandHeart className="size-5" />
                </span>
                <span className="absolute left-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#dcfce7] backdrop-blur">
                  <Sparkles className="size-5" />
                </span>
              </div>
            </div>

            <p className="mt-8 hidden text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-emerald-100/50 lg:block">
              Small Actions. Greater Impact.
            </p>
          </div>
        </aside>

        <div className="relative flex items-center justify-center bg-background px-5 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,var(--secondary),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-primary/5 blur-3xl dark:bg-emerald-400/5"
          />

          <div className="relative w-full max-w-md">
            <h1
              id="signup-heading"
              className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Create Your Account
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Start your journey towards making a difference.
            </p>

            <form className="mt-8" onSubmit={onSubmit} noValidate>
              <div className="space-y-5">
                <FormField
                  id="name"
                  
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon={User}
                  autoComplete="name"
                />
                <FormField
                  id="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  icon={Mail}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                />
                <FormField
                  id="image"
                  label="Profile Photo URL"
                  placeholder="https://example.com/photo.jpg"
                  icon={ImageIcon}
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                />
                <FormField
                  id="password"
                  label="Password"
                  placeholder="Create a password"
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  hint="Must contain at least 6 characters, including uppercase and lowercase letters."
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  }
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-emerald-600"
              >
                Create Account
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="my-6 flex items-center gap-3">
                <span aria-hidden className="h-px flex-1 bg-border" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Or continue with
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-secondary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-white/5"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <p className="mt-7 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline dark:text-emerald-400"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
