export type TogetherWeEvent = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail?: string;
  description?: string;
};

export type EventDetails = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
  organizerName: string;
  organizerEmail: string;
  organizerImage: string;
};

export const EVENT_CATEGORIES = [
  "All Events",
  "Donation",
  "Cleanup",
  "Plantation",
  "Education",
  "Healthcare",
  "Community Support",
  "Other",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

const KNOWN_EVENT_TYPES = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Education",
  "Healthcare",
  "Community Support",
];

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})/;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * Converts a date value to a date-only `YYYY-MM-DD` string. Date-only strings
 * are compared and sorted lexicographically so no UTC conversion can shift an
 * event into the previous or next day.
 */
export function toDateOnly(value: unknown) {
  const raw = asString(value);
  const match = DATE_ONLY_PATTERN.exec(raw);

  if (!match) {
    return "";
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
}

export function getTodayDateOnly(now = new Date()) {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}`;
}

export function normalizeEvents(payload: unknown): TogetherWeEvent[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const record = item as Record<string, unknown>;
    const id = asString(record._id) || asString(record.id);
    const title = asString(record.title);

    if (!id || !title) {
      return [];
    }

    return [
      {
        _id: id,
        title,
        type: asString(record.type) || "Other",
        date: toDateOnly(record.date),
        location: asString(record.location),
        thumbnail: asString(record.thumbnail),
        description: asString(record.description),
      },
    ];
  });
}

export function getUpcomingEvents(
  events: TogetherWeEvent[],
  today = getTodayDateOnly(),
) {
  return events
    .filter((event) => Boolean(event.date) && event.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date < b.date ? -1 : 1;
      }

      return a._id.localeCompare(b._id);
    });
}

export function matchesCategory(event: TogetherWeEvent, category: string) {
  if (category === "All Events") {
    return true;
  }

  const eventType = event.type.trim().toLowerCase();
  const selectedCategory = category.trim().toLowerCase();

  if (selectedCategory === "other") {
    return !KNOWN_EVENT_TYPES.some(
      (type) => type.toLowerCase() === eventType,
    );
  }

  return eventType === selectedCategory;
}

export function formatEventDate(dateOnly: string) {
  const [year, month, day] = dateOnly.split("-").map(Number);

  if (!year || !month || !day) {
    return dateOnly;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function formatEventDateMedium(value: string) {
  const dateOnly = toDateOnly(value);
  const [year, month, day] = dateOnly.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
