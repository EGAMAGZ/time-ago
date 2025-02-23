/**
 * An array of time intervals represented in seconds.
 * Each interval object contains a unit of time and the corresponding duration in seconds.
 *
 * @type {Array<{ unit: string; seconds: number }>}
 */
const INTERVALS: Array<{ unit: string; seconds: number }> = [
  { unit: "year", seconds: 31536000 }, // 365 days
  { unit: "month", seconds: 2592000 }, // 30 days
  { unit: "week", seconds: 604800 }, // 7 days
  { unit: "day", seconds: 86400 }, // 24 hours
  { unit: "hour", seconds: 3600 }, // 60 minutes
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

/**
 * Returns a human-readable string representing the time elapsed since the given time.
 *
 * ```ts
 * import { timeAgo } from "@egamagz/time-ago";
 * import { assertEquals } from "@std/assert";
 *
 * const now = new Date();
 * const fewMsAgo = new Date(now.getTime() - 100);
 *
 * assertEquals(timeAgo(fewMsAgo, now), "just now");
 *
 * const fiveMinutesAgo = new Date(now.getTime() - (60 * 1000 * 5));
 *
 * assertEquals(timeAgo(fiveMinutesAgo, now), "5 minutes ago");
 *
 * const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
 *
 * assertEquals(timeAgo(oneHourAgo, now), "an hour ago");
 *
 * const twoDaysAgo = new Date(now.getTime() - 86400 * 1000 * 2);
 *
 * assertEquals(timeAgo(twoDaysAgo, now), "2 days ago");
 *
 * const lastWeek = new Date(now.getTime() - 86400 * 1000 * 7);
 *
 * assertEquals(timeAgo(lastWeek, now), "a week ago");
 *
 * const lastMonth = new Date(now.getTime() - 86400 * 1000 * 30);
 *
 * assertEquals(timeAgo(lastMonth, now), "a month ago");
 *
 * const lastYear = new Date(now.getTime() - 86400 * 1000 * 365 * 5);
 *
 * assertEquals(timeAgo(lastYear, now), "5 years ago");
 * ```
 * @param {number | Date} time - The time to compare against the current time.
 * Can be a timestamp in milliseconds or a Date object.
 * @param {number | Date} [now=Date.now()] - The current time in milliseconds.
 * Defaults to the current time if not provided.
 * @returns {string | undefined} A string representing the time elapsed, such as "just now",
 * "5 minutes ago", or "2 days ago".
 */
export function timeAgo(
  time: number | Date,
  now: number | Date = Date.now(),
): string | undefined {
  const timeMs = time instanceof Date ? time.getTime() : time;
  const nowMs = now instanceof Date ? now.getTime() : now;

  const secondsElapsed = (nowMs - timeMs) / 1_000;

  if (secondsElapsed < 0) {
    throw new Error("Time cannot be in the future");
  }

  if (secondsElapsed < 1) {
    return "just now";
  }

  for (const { unit, seconds } of INTERVALS) {
    if (secondsElapsed >= seconds) {
      const count = Math.round(secondsElapsed / seconds);

      const singularArticle = unit === "hour" ? "an" : "a";
      const prefix = count === 1 ? singularArticle : count;

      return `${prefix} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }
}
