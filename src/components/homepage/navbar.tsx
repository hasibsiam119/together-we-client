"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, LogOut, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Flip to true to preview the signed-in design.

const Navbar = () => {
    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle("dark");
        root.style.colorScheme = root.classList.contains("dark") ? "dark" : "light";
    };
    const { data: session } = authClient.useSession();
    const user = session?.user;

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
                            <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary ring-2 ring-secondary">
                                <Avatar>
                                    <AvatarImage src={user?.image || undefined} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </span>
                            <Button onClick={handleSignout} type="button" variant="outline" size="sm">
                                <LogOut className="size-4" />
                                <span className="hidden sm:inline">Log out</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={'/sign-in'}><Button type="button" variant="ghost" size="sm">
                                Sign in
                            </Button></Link>
                           <Link href={'/sign-up'}> <Button type="button" size="sm">
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
