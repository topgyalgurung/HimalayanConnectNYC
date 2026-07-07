// Import Jest globals explicitly so TS doesn't resolve `expect` to the
// Cypress/chai types that are also in this project.
import { describe, expect, it } from "@jest/globals";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { formatTimeRange, getOpenStatus } from "../formatHours";

dayjs.extend(utc);
dayjs.extend(timezone);

// Times are stored as time-of-day pinned to 1970-01-01 UTC.
const t = (time: string) => `1970-01-01T${time}:00.000Z`;

// Build a "now" at a given New York wall-clock time. 2026-07-06 is a Monday.
const nyNow = (dateTime: string) => dayjs.tz(dateTime, "America/New_York");

describe("formatTimeRange", () => {
  it("formats a standard range", () => {
    expect(formatTimeRange(t("09:00"), t("17:30"))).toBe("9 AM – 5:30 PM");
  });

  it("handles noon and midnight", () => {
    expect(formatTimeRange(t("00:00"), t("12:00"))).toBe("12 AM – 12 PM");
  });

  it("returns null when a time is missing", () => {
    expect(formatTimeRange(null, t("17:00"))).toBeNull();
    expect(formatTimeRange(t("09:00"), undefined)).toBeNull();
  });
});

describe("getOpenStatus", () => {
  const days = "Mon,Tue,Wed,Thu,Fri";

  it("is open during business hours on a listed day", () => {
    const status = getOpenStatus(days, t("09:00"), t("17:00"), nyNow("2026-07-06 10:00"));
    expect(status).toEqual({ isOpen: true, label: "Open · Closes 5 PM", time: "5 PM" });
  });

  it("is closed outside business hours", () => {
    const status = getOpenStatus(days, t("09:00"), t("17:00"), nyNow("2026-07-06 18:00"));
    expect(status).toEqual({ isOpen: false, label: "Closed · Opens 9 AM", time: "9 AM" });
  });

  it("is closed on a day that is not listed", () => {
    // 2026-07-05 is a Sunday
    const status = getOpenStatus(days, t("09:00"), t("17:00"), nyNow("2026-07-05 10:00"));
    expect(status?.isOpen).toBe(false);
  });

  it("handles overnight hours past midnight", () => {
    // Open Mon 8 PM – 2 AM; Tue 1 AM should still count as open.
    const late = getOpenStatus("Mon", t("20:00"), t("02:00"), nyNow("2026-07-07 01:00"));
    expect(late?.isOpen).toBe(true);

    const afterClose = getOpenStatus("Mon", t("20:00"), t("02:00"), nyNow("2026-07-07 03:00"));
    expect(afterClose?.isOpen).toBe(false);
  });

  it("returns null when hours or days are missing", () => {
    expect(getOpenStatus(null, t("09:00"), t("17:00"))).toBeNull();
    expect(getOpenStatus(days, null, t("17:00"))).toBeNull();
  });
});
