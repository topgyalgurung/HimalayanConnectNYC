/**
 * Business-hours helpers.
 *
 * Open/close times are stored in the DB as time-of-day only (Postgres
 * `time` via Prisma `@db.Time`), which Prisma surfaces as a Date pinned to
 * 1970-01-01 UTC. They represent the resource's local wall-clock hours, so
 * they must always be read with UTC accessors - never the viewer's locale -
 * and compared against the current time in New York, where every resource
 * in this app is located.
 */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const RESOURCE_TIMEZONE = "America/New_York";
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type TimeInput = string | Date | null | undefined;

const toMinutesOfDay = (value: TimeInput): number | null => {
  if (!value) return null;
  const parsed = dayjs.utc(value);
  if (!parsed.isValid()) return null;
  return parsed.hour() * 60 + parsed.minute();
};

const formatMinutes = (minutes: number): string => {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return minute === 0
    ? `${hour12} ${suffix}`
    : `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
};

/** "9 AM – 5:30 PM", or null when either time is missing/invalid. */
export function formatTimeRange(
  openTime: TimeInput,
  closeTime: TimeInput
): string | null {
  const open = toMinutesOfDay(openTime);
  const close = toMinutesOfDay(closeTime);
  if (open === null || close === null) return null;
  return `${formatMinutes(open)} – ${formatMinutes(close)}`;
}

const parseOpenDays = (openDays: string | null | undefined): Set<string> => {
  if (!openDays) return new Set();
  return new Set(
    openDays
      .split(",")
      .map((d) => d.trim().slice(0, 3))
      .filter((d) => DAY_NAMES.includes(d))
  );
};

export interface OpenStatus {
  isOpen: boolean;
  /** e.g. "Open · Closes 5 PM" or "Closed · Opens 9 AM" */
  label: string;
}

/**
 * Whether the resource is open right now (New York time). Returns null when
 * hours or days aren't specified - we don't guess and claim "Closed" for a
 * resource that simply hasn't provided its schedule.
 */
export function getOpenStatus(
  openDays: string | null | undefined,
  openTime: TimeInput,
  closeTime: TimeInput,
  now: dayjs.Dayjs = dayjs()
): OpenStatus | null {
  const open = toMinutesOfDay(openTime);
  const close = toMinutesOfDay(closeTime);
  const days = parseOpenDays(openDays);
  if (open === null || close === null || days.size === 0) return null;

  const local = now.tz(RESOURCE_TIMEZONE);
  const nowMinutes = local.hour() * 60 + local.minute();
  const today = DAY_NAMES[local.day()];
  const yesterday = DAY_NAMES[(local.day() + 6) % 7];

  let isOpen: boolean;
  if (close > open) {
    isOpen = days.has(today) && nowMinutes >= open && nowMinutes < close;
  } else {
    // Overnight hours (e.g. 8 PM – 2 AM): open late on a listed day, or in
    // the early morning following one.
    isOpen =
      (days.has(today) && nowMinutes >= open) ||
      (days.has(yesterday) && nowMinutes < close);
  }

  return isOpen
    ? { isOpen, label: `Open · Closes ${formatMinutes(close)}` }
    : { isOpen, label: `Closed · Opens ${formatMinutes(open)}` };
}
