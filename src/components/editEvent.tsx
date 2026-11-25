"use client";

import {
    CalendarDays,
    Check,
    ChevronDown,
    Image as ImageIcon,
    MapPin,
    Pencil,
    Tags,
    Type as TypeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export interface EventItem {
    _id?: string;
    id?: string;
    title: string;
    type?: string;
    date: string;
    location?: string;
    thumbnail?: string;
    description?: string;
    email?: string;
}

type UpdateEventPageProps = {
    event: EventItem;
};

const eventTypes = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Education",
    "Healthcare",
    "Community Support",
    "Other",
];

const fieldInputClasses =
    "h-10 rounded-lg border-border bg-background/60 pl-10 pr-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/60 hover:border-primary/30 focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-primary/10 dark:bg-input/20";

const fieldIconClasses =
    "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60";

const requiredMark = (
    <span aria-hidden className="text-destructive">
        *
    </span>
);

const UpdateEventPage = ({ event }: UpdateEventPageProps) => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const token = await getTokenFromClient()
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${event._id ?? event.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) return;
        setOpen(false);
        router.refresh();
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            
                <DialogTrigger
                    render={
                        <Button
                            type="button"
                            aria-label={`Edit event: ${event.title}`}
                            className="h-10 flex-1 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-[#14532d] md:flex-none"
                        >
                            <Pencil className="size-4" aria-hidden />
                            Edit
                        </Button>
                    }
                />
            <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
                <form
                    id="edit-event-form"
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                >
                    <DialogHeader className="pr-8">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/15 bg-secondary/60 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-primary dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                            <Pencil className="size-3" aria-hidden />
                            Editing event
                        </span>

                        <DialogTitle className="font-heading text-xl font-bold tracking-[-0.02em]">
                            Edit Event
                        </DialogTitle>

                        <DialogDescription>
                            Make changes to your created event here. Click save
                            when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label
                                htmlFor="edit-event-title"
                                className="text-sm font-semibold text-foreground"
                            >
                                Event Title {requiredMark}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="edit-event-title"
                                    name="title"
                                    type="text"
                                    required
                                    defaultValue={event.title}
                                    placeholder="e.g. Winter Clothes Distribution"
                                    className={fieldInputClasses}
                                />
                                <TypeIcon
                                    className={fieldIconClasses}
                                    aria-hidden
                                />
                            </div>
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field>
                                <Label
                                    htmlFor="edit-event-type"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Event Type {requiredMark}
                                </Label>
                                <div className="relative">
                                    <select
                                        id="edit-event-type"
                                        name="type"
                                        required
                                        defaultValue={event.type}
                                        className={`${fieldInputClasses} cursor-pointer appearance-none pr-9`}
                                    >
                                        {eventTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <Tags
                                        className={fieldIconClasses}
                                        aria-hidden
                                    />
                                    <ChevronDown
                                        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60"
                                        aria-hidden
                                    />
                                </div>
                            </Field>

                            <Field>
                                <Label
                                    htmlFor="edit-event-date"
                                    className="text-sm font-semibold text-foreground"
                                >
                                    Event Date {requiredMark}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="edit-event-date"
                                        name="date"
                                        type="date"
                                        required
                                        defaultValue={event.date?.slice(0, 10)}
                                        className={`${fieldInputClasses} cursor-pointer dark:[color-scheme:dark]`}
                                    />
                                    <CalendarDays
                                        className={fieldIconClasses}
                                        aria-hidden
                                    />
                                </div>
                            </Field>
                        </div>

                        <Field>
                            <Label
                                htmlFor="edit-event-location"
                                className="text-sm font-semibold text-foreground"
                            >
                                Location / Venue {requiredMark}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="edit-event-location"
                                    name="location"
                                    type="text"
                                    required
                                    defaultValue={event.location}
                                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                    className={fieldInputClasses}
                                />
                                <MapPin
                                    className={fieldIconClasses}
                                    aria-hidden
                                />
                            </div>
                        </Field>

                        <Field>
                            <Label
                                htmlFor="edit-event-thumbnail"
                                className="text-sm font-semibold text-foreground"
                            >
                                Thumbnail Image URL
                            </Label>
                            <div className="flex items-center gap-3">
                                <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-border/80 bg-muted/40">
                                    {event.thumbnail ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={event.thumbnail}
                                            alt=""
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon
                                            className="size-4 text-muted-foreground/60"
                                            aria-hidden
                                        />
                                    )}
                                </div>

                                <div className="relative min-w-0 flex-1">
                                    <Input
                                        id="edit-event-thumbnail"
                                        name="thumbnail"
                                        type="url"
                                        inputMode="url"
                                        defaultValue={event.thumbnail}
                                        placeholder="https://example.com/event-image.jpg"
                                        className={fieldInputClasses}
                                    />
                                    <ImageIcon
                                        className={fieldIconClasses}
                                        aria-hidden
                                    />
                                </div>
                            </div>
                        </Field>

                        <Field>
                            <Label
                                htmlFor="edit-event-description"
                                className="text-sm font-semibold text-foreground"
                            >
                                Event Description {requiredMark}
                            </Label>
                            <textarea
                                id="edit-event-description"
                                name="description"
                                required
                                rows={4}
                                defaultValue={event.description}
                                placeholder="Explain the purpose of the event, volunteers required, and activities planned..."
                                className="min-h-24 w-full resize-none rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-primary/30 focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10 dark:bg-input/20"
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 rounded-lg border-border px-4 text-sm font-semibold"
                                >
                                    Cancel
                                </Button>
                            }
                        />
                        <Button
                            type="submit"
                            form="edit-event-form"
                            className="h-10 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-[#14532d]"
                        >
                            <Check className="size-4" aria-hidden />
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateEventPage;
