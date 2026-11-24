"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CirclePlus,
  LogOut,
  Moon,
  Settings,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const accountLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Create Event", href: "/events/create", icon: CirclePlus },
  { label: "Manage Events", href: "/dashboard/events", icon: Settings },
  { label: "Joined Events", href: "/events/joined", icon: CircleCheck },
];

const Navbar = () => {
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    root.style.colorScheme = root.classList.contains("dark") ? "dark" : "light";
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const displayName = user?.name?.trim() || "TogetherWe Member";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "TW";

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="TogetherWe home">
          <Image
            src="/TogetherWe%20Community%20Logo.png"
            alt="TogetherWe"
            width={1933}
            height={814}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <div className="flex min-w-0 flex-1 justify-center">
          <Link
            href="/events"
            className="group hidden items-center gap-2 rounded-full border border-border/80 bg-secondary/70 px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary md:flex"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <CalendarDays className="size-4 text-primary" />
            <span className="max-w-[20rem] truncate">Upcoming Event</span>
            <ChevronRight className="size-4 text-primary/70 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="text-foreground"
          >
            <Sun className="size-5 dark:hidden" />
            <Moon className="hidden size-5 dark:block" />
          </Button>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Open account menu"
                  className="group flex items-center gap-1 rounded-full p-0.5 outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary/15 data-[popup-open]:bg-secondary/60"
                >
                  <Avatar
                    size="lg"
                    className="ring-2 ring-secondary transition-shadow duration-200 group-hover:ring-primary/25"
                  >
                    <AvatarImage src={user.image || undefined} alt={displayName} />
                    <AvatarFallback className="bg-secondary text-sm font-semibold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-border/70 bg-popover p-0 shadow-xl shadow-black/10"
                >
                  <div className="px-4 pb-3 pt-4">
                    <p className="truncate text-[0.95rem] font-bold leading-5 text-foreground">
                      {displayName}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator className="mx-0 my-0 bg-border/70" />

                  <div className="space-y-0.5 p-2">
                    {accountLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <DropdownMenuItem
                          key={link.href}
                          render={<Link href={link.href} />}
                          className="gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-foreground/85 focus:bg-secondary/60 focus:text-foreground focus:[&_svg]:text-primary"
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-primary/20 bg-secondary/30 text-primary">
                            <Icon className="size-4" />
                          </span>
                          {link.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </div>

                  <DropdownMenuSeparator className="mx-0 my-0 bg-border/70" />

                  <div className="p-2">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleSignout}
                      className="gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-red-600 focus:bg-red-50 focus:text-red-600 focus:[&_svg]:text-red-600 dark:text-red-400 dark:focus:bg-red-500/10 dark:focus:text-red-400"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                        <LogOut className="size-4" />
                      </span>
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleSignout}
                type="button"
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button type="button" variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button type="button" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
