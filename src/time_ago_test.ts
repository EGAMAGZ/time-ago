import { timeAgo } from "./time_ago.ts";
import { test } from "@cross/test";
import { expect } from "@std/expect";

test("throws when the date is in the future", () => {
  const yesterday = new Date("2025-02-21");
  const today = new Date("2025-02-22");

  expect(() => {
    timeAgo(today, yesterday);
  }).toThrow(new Error("Time cannot be in the future"));
});

test("returns 'just now' for the current time", () => {
  const now = new Date();
  expect(timeAgo(now)).toEqual("just now");
});

test("returns 'just now' for a time less than a second ago", () => {
  const now = new Date();
  const justNow = new Date(now.getTime() - 500);
  expect(timeAgo(justNow, now)).toEqual("just now");
});

test("return 'a second ago' for a difference of one second", () => {
  const justNow = new Date();
  const oneSecondAgo = new Date(justNow.getTime() - 1000);

  expect(timeAgo(oneSecondAgo, justNow)).toEqual("a second ago");
});

test("return 'seconds ago' for a difference of two seconds", () => {
  const justNow = new Date();
  const twoSecondsAgo = new Date(justNow.getTime() - 2000);

  expect(timeAgo(twoSecondsAgo, justNow)).toEqual("2 seconds ago");
});

test("return 'a minute ago' for a difference of one minute", () => {
  const justNow = new Date();
  const oneMinuteAgo = new Date(justNow.getTime() - 60 * 1000);

  expect(timeAgo(oneMinuteAgo, justNow)).toEqual("a minute ago");
});

test("return 'minutes ago' for a difference of five minutes", () => {
  const justNow = new Date();
  const fiveMinutesAgo = new Date(justNow.getTime() - (60 * 1000 * 5));

  expect(timeAgo(fiveMinutesAgo, justNow)).toEqual("5 minutes ago");
});

test("return 'an hour ago' for a difference of one hour", () => {
  const justNow = new Date();
  const oneHourAgo = new Date(justNow.getTime() - (60 * 60 * 1000));

  expect(timeAgo(oneHourAgo, justNow)).toEqual("an hour ago");
});

test("return 'hours ago' for a difference of two hours", () => {
  const justNow = new Date();
  const twoHoursAgo = new Date(justNow.getTime() - (60 * 60 * 1000 * 2));

  expect(timeAgo(twoHoursAgo, justNow)).toEqual("2 hours ago");
});

test("return 'a day ago' for a difference of one day", () => {
  const yesterday = new Date("2025-02-21");
  const today = new Date("2025-02-22");

  expect(timeAgo(yesterday, today)).toEqual("a day ago");
});

test("return 'days ago' for a difference of two or more days", () => {
  const beforeYesterday = new Date("2025-02-21");
  const today = new Date("2025-02-23");

  expect(timeAgo(beforeYesterday, today)).toEqual("2 days ago");
});

test("return 'a week ago' for a difference of one week", () => {
  const lastWeek = new Date("2025-02-14");
  const today = new Date("2025-02-22");

  expect(timeAgo(lastWeek, today)).toEqual("a week ago");
});

test("return 'weeks ago' for a difference of two weeks", () => {
  const beforeLastWeek = new Date("2025-02-14");
  const today = new Date("2025-02-29");

  expect(timeAgo(beforeLastWeek, today)).toEqual("2 weeks ago");
});

test("return 'a month ago' for a difference of one month", () => {
  const lastMonth = new Date("2025-01-22");
  const today = new Date("2025-02-22");

  expect(timeAgo(lastMonth, today)).toEqual("a month ago");
});

test("return 'months ago' for a difference of two months", () => {
  const beforeLastMonth = new Date("2025-01-22");
  const today = new Date("2025-03-22");

  expect(timeAgo(beforeLastMonth, today)).toEqual("2 months ago");
});

test("return 'a year ago' for a difference of one year", () => {
  const lastYear = new Date("2025-02-22");
  const today = new Date("2026-02-22");

  expect(timeAgo(lastYear, today)).toEqual("a year ago");
});

test("return 'years ago' for a difference of two years", () => {
  const beforeLastYear = new Date("2025-02-22");
  const today = new Date("2027-02-22");

  expect(timeAgo(beforeLastYear, today)).toEqual("2 years ago");
});
