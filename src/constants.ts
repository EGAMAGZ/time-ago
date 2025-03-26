/**
 * An array of time intervals represented in seconds.
 * Each interval object contains a unit of time and the corresponding duration in seconds.
 *
 * @type {Array<{ unit: string; seconds: number }>}
 */
export const INTERVALS: Array<{ unit: string; seconds: number }> = [
  { unit: "year", seconds: 31536000 }, // 365 days
  { unit: "month", seconds: 2592000 }, // 30 days
  { unit: "week", seconds: 604800 }, // 7 days
  { unit: "day", seconds: 86400 }, // 24 hours
  { unit: "hour", seconds: 3600 }, // 60 minutes
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];
