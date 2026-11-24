const EventsSkeleton = () => {
  return (
    <div role="status" aria-busy="true" aria-label="Loading upcoming events">
      <span className="sr-only">Loading upcoming events...</span>

      <div className="rounded-2xl border border-border/80 bg-card/90 p-3 shadow-sm sm:p-4">
        <div className="flex animate-pulse flex-col gap-3 lg:flex-row lg:items-center">
          <div className="h-11 w-full shrink-0 rounded-xl bg-muted lg:w-80" />
          <div className="flex min-w-0 flex-1 gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-9 shrink-0 rounded-full bg-muted"
                style={{ width: `${68 + (index % 3) * 18}px` }}
              />
            ))}
          </div>
          <div className="h-9 w-48 shrink-0 rounded-full bg-muted" />
        </div>
      </div>

      <div className="mt-8 flex animate-pulse flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-3 w-36 rounded bg-muted" />
          <div className="mt-3 h-7 w-64 max-w-full rounded bg-muted sm:h-8 sm:w-80" />
          <div className="mt-3 h-4 w-72 max-w-full rounded bg-muted" />
        </div>
        <div className="h-8 w-24 shrink-0 rounded-full bg-muted" />
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="overflow-hidden rounded-[20px] border border-border/80 bg-card shadow-sm"
          >
            <div className="aspect-video w-full animate-pulse bg-muted" />

            <div className="p-5 sm:p-6">
              <div className="animate-pulse">
                <div className="h-5 w-4/5 rounded bg-muted" />
                <div className="mt-2 h-5 w-3/5 rounded bg-muted" />
                <div className="mt-4 h-4 w-1/2 rounded bg-muted" />
                <div className="mt-4 space-y-2">
                  <div className="h-3.5 w-full rounded bg-muted" />
                  <div className="h-3.5 w-11/12 rounded bg-muted" />
                  <div className="h-3.5 w-2/3 rounded bg-muted" />
                </div>
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <div className="h-7 w-24 rounded-lg bg-muted" />
                  <div className="h-8 w-24 rounded-lg bg-muted" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsSkeleton;
