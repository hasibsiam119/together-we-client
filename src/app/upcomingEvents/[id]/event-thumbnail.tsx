"use client";

import { useState } from "react";
import { HeartHandshake, ImageOff } from "lucide-react";

type EventThumbnailProps = {
  src?: string;
  alt: string;
};

const EventThumbnail = ({ src, alt }: EventThumbnailProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  if (!showImage) {
    return (
      <div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-card to-primary/10 dark:from-emerald-500/10 dark:via-card dark:to-emerald-400/5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-primary/10 dark:border-emerald-400/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-12 size-64 rounded-full bg-accent/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-10 rounded-[32px] border border-dashed border-primary/15 dark:border-emerald-400/15"
        />

        <div className="relative flex flex-col items-center px-6 text-center">
          <span className="grid size-16 place-items-center rounded-3xl border border-primary/15 bg-card/80 text-primary shadow-lg shadow-primary/10 backdrop-blur dark:border-emerald-400/20 dark:text-emerald-400">
            <HeartHandshake className="size-7" />
          </span>
          <p className="mt-4 text-base font-bold tracking-[-0.02em] text-foreground sm:text-lg">
            TogetherWe Community Event
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ImageOff className="size-3.5" />
            No cover image provided
          </p>
        </div>
      </div>
    );
  }

  return (
    // Event thumbnails are arbitrary remote URLs, so they cannot use the
    // Next.js image optimizer without configuring every possible host.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setImageFailed(true)}
      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  );
};

export default EventThumbnail;
