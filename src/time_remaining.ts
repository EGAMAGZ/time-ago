import { INTERVALS } from "./constants.ts";

/**
 * Returns a human-readable string representing the time remaining until the given future time.
 *
 * ```ts
 * import { timeRemaining } from "@egamagz/time-ago";
 * import { assertEquals } from "@std/assert";
 *
 * const now = new Date();
 * const fewMsLater = new Date(now.getTime() + 100);
 *
 * assertEquals(timeRemaining(fewMsLater, now), "just now");
 *
 * const fiveMinutesLater = new Date(now.getTime() + (60 * 1000 * 5));
 *
 * assertEquals(timeRemaining(fiveMinutesLater, now), "in 5 minutes");
 *
 * const oneHourLater = new Date(now.getTime() + (60 * 60 * 1000));
 *
 * assertEquals(timeRemaining(oneHourLater, now), "in an hour");
 *
 * const twoDaysLater = new Date(now.getTime() + 86400 * 1000 * 2);
 *
 * assertEquals(timeRemaining(twoDaysLater, now), "in 2 days");
 *
 * const nextWeek = new Date(now.getTime() + 86400 * 1000 * 7);
 *
 * assertEquals(timeRemaining(nextWeek, now), "in a week");
 *
 * const nextMonth = new Date(now.getTime() + 86400 * 1000 * 30);
 *
 * assertEquals(timeRemaining(nextMonth, now), "in a month");
 *
 * const nextYear = new Date(now.getTime() + 86400 * 1000 * 365 * 5);
 *
 * assertEquals(timeRemaining(nextYear, now), "in 5 years");
 * ```
 * @param {number | Date} time - The future time to compare against the current time.
 * Can be a timestamp in milliseconds or a Date object.
 * @param {number | Date} [now=Date.now()] - The current time in milliseconds.
 * Defaults to the current time if not provided.
 * @returns {string | undefined} A string representing the time remaining, such as "just now",
 * "in 5 minutes", or "in 2 days".
 */
export function timeRemaining(
  time: number | Date,
  now: number | Date = Date.now(),
): string | undefined {
  const timeMs = time instanceof Date ? time.getTime() : time;
  const nowMs = now instanceof Date ? now.getTime() : now;

  const secondsRemaining = (timeMs - nowMs) / 1_000;

  if (secondsRemaining < 0) {
    throw new Error("Time cannot be in the past");
  }

  if (secondsRemaining < 1) {
    return "just now";
  }

  // Handle special cases for better natural language
  const WEEK_SECONDS = 604800; // 7 days
  const MONTH_SECONDS = 2592000; // 30 days

  // Check for exact month difference when using Date objects
  if (time instanceof Date && now instanceof Date) {
    // Check for same day of month but different month
    const sameDay = time.getDate() === now.getDate();
    const nextMonth = time.getMonth() === (now.getMonth() + 1) % 12;
    const nextYear = time.getMonth() === 0 && now.getMonth() === 11 &&
      time.getFullYear() === now.getFullYear() + 1;

    // Handle exact month difference
    if (sameDay && (nextMonth || nextYear)) {
      return "in a month";
    }

    // For periods that are ~4 weeks but not an exact month
    if (
      secondsRemaining >= WEEK_SECONDS * 3 && secondsRemaining < MONTH_SECONDS
    ) {
      const weeks = Math.round(secondsRemaining / WEEK_SECONDS);
      return `in ${weeks} weeks`;
    }
  }

  // Process regular intervals
  for (const { unit, seconds } of INTERVALS) {
    if (secondsRemaining >= seconds) {
      const count = Math.round(secondsRemaining / seconds);

      // Use proper articles for singular forms
      const singularArticle = unit === "hour" ? "an" : "a";
      const prefix = count === 1 ? singularArticle : count;

      return `in ${prefix} ${unit}${count > 1 ? "s" : ""}`;
    }
  }
}
