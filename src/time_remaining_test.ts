import { timeRemaining } from "./time_remaining.ts";
import { test } from "@cross/test";
import { expect } from "@std/expect";

test("throws when the date is in the past", () => {
  const yesterday = new Date("2025-02-21");
  const today = new Date("2025-02-22");

  expect(() => {
    timeRemaining(yesterday, today);
  }).toThrow(new Error("Time cannot be in the past"));
});

test("returns 'just now' for the current time", () => {
  const now = new Date();
  expect(timeRemaining(now)).toEqual("just now");
});

test("returns 'just now' for a time less than a second in the future", () => {
  const now = new Date();
  const justNow = new Date(now.getTime() + 500);
  expect(timeRemaining(justNow, now)).toEqual("just now");
});

test("return 'in a second' for a difference of one second", () => {
  const justNow = new Date();
  const oneSecondIn = new Date(justNow.getTime() + 1000);

  expect(timeRemaining(oneSecondIn, justNow)).toEqual("in a second");
});

test("return 'in 2 seconds' for a difference of two seconds", () => {
  const justNow = new Date();
  const twoSecondsIn = new Date(justNow.getTime() + 2000);

  expect(timeRemaining(twoSecondsIn, justNow)).toEqual("in 2 seconds");
});

test("return 'in a minute' for a difference of one minute", () => {
  const justNow = new Date();
  const oneMinuteIn = new Date(justNow.getTime() + 60 * 1000);

  expect(timeRemaining(oneMinuteIn, justNow)).toEqual("in a minute");
});

test("return 'in 5 minutes' for a difference of five minutes", () => {
  const justNow = new Date();
  const fiveMinutesIn = new Date(justNow.getTime() + (60 * 1000 * 5));

  expect(timeRemaining(fiveMinutesIn, justNow)).toEqual("in 5 minutes");
});

test("return 'in an hour' for a difference of one hour", () => {
  const justNow = new Date();
  const oneHourIn = new Date(justNow.getTime() + (60 * 60 * 1000));

  expect(timeRemaining(oneHourIn, justNow)).toEqual("in an hour");
});

test("return 'in 2 hours' for a difference of two hours", () => {
  const justNow = new Date();
  const twoHoursIn = new Date(justNow.getTime() + (60 * 60 * 1000 * 2));

  expect(timeRemaining(twoHoursIn, justNow)).toEqual("in 2 hours");
});

test("return 'in a day' for a difference of one day", () => {
  const justNow = new Date("2025-02-21");
  const oneDayIn = new Date("2025-02-22");

  expect(timeRemaining(oneDayIn, justNow)).toEqual("in a day");
});

test("return 'in 2 days' for a difference of two or more days", () => {
  const justNow = new Date("2025-02-21");
  const twoDaysIn = new Date("2025-02-23");

  expect(timeRemaining(twoDaysIn, justNow)).toEqual("in 2 days");
});

test("return 'in a week' for a difference of one week", () => {
  const justNow = new Date("2025-02-21");
  const oneWeekIn = new Date("2025-02-28");

  expect(timeRemaining(oneWeekIn, justNow)).toEqual("in a week");
});

test("return 'in 2 weeks' for a difference of two weeks", () => {
  const justNow = new Date("2025-02-21");
  const twoWeeksIn = new Date("2025-03-04");

  expect(timeRemaining(twoWeeksIn, justNow)).toEqual("in 2 weeks");
});

test("return 'in a month' for a difference of one month", () => {
  const justNow = new Date("2025-02-21");
  const oneMonthIn = new Date("2025-03-21");

  expect(timeRemaining(oneMonthIn, justNow)).toEqual("in a month");
});

test("return 'in 2 months' for a difference of two months", () => {
  const justNow = new Date("2025-02-21");
  const twoMonthsIn = new Date("2025-04-21");

  expect(timeRemaining(twoMonthsIn, justNow)).toEqual("in 2 months");
});

test("return 'in a year' for a difference of one year", () => {
  const justNow = new Date("2025-02-21");
  const oneYearIn = new Date("2026-02-21");

  expect(timeRemaining(oneYearIn, justNow)).toEqual("in a year");
});

test("return 'in 2 years' for a difference of two years", () => {
  const justNow = new Date("2025-02-21");
  const twoYearsIn = new Date("2027-02-21");

  expect(timeRemaining(twoYearsIn, justNow)).toEqual("in 2 years");
});
