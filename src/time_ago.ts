const INTERVALS = [
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
 * @example
 * ```
 * const now = new Date();
 * const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
 * const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
 *
 * console.log(timeAgo(fiveMinutesAgo)); // "5 minutes ago"
 * console.log(timeAgo(twoDaysAgo)); // "2 days ago"
 * ```
 * @param {number | Date} time - The time to compare against the current time.
 * Can be a timestamp in milliseconds or a Date object.
 * @param {number} [now=Date.now()] - The current time in milliseconds.
 * Defaults to the current time if not provided.
 * @returns {string} A string representing the time elapsed, such as "just now",
 * "5 minutes ago", or "2 days ago".
 */
export function timeAgo(time: number | Date, now = Date.now()) {
  const timeMs = time instanceof Date ? time.getTime() : time;

  const secondsElapsed = (now - timeMs) / 1_000;

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
