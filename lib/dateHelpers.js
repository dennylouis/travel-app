import { Info, DateTime, Settings } from "luxon";
// Settings.defaultZoneName = "Australia/Melbourne";

export function getExhibitionsByTargetDay(exhibitions, targetDay) {
  if (!exhibitions) return [];

  const selectedDayEpoch = new Date(targetDay).getTime();
  return exhibitions.filter((x) => {
    const startDate = new Date(x.date.start).getTime();
    const endDate = new Date(x.date.end).getTime();

    return startDate < selectedDayEpoch && endDate >= selectedDayEpoch;
  });
}

export function getDatesForMonths(numberOfMonths) {
  const currentMonth = getCurrentMonth();

  const dates = Array.from({ length: numberOfMonths }, (_, i) => {
    const month = currentMonth.plus({ months: i });

    // Get the amount of days in the month
    const lengthOfMonth = month.daysInMonth;

    // Map over the days in the month
    const days = Array.from({ length: lengthOfMonth }, (_, i) => {
      // Get the date of each day in the month and format it correctly
      const day = month.plus({ days: i });
      return formatISO(day);
      // return moment(day).format("YYYY-MM-DD");
    });

    return days;
  });

  return dates.flat();
}

export function formatRange(start, end) {
  const format = "d LLLL yyyy";
  return `${DateTime.fromISO(start).toFormat(format)} – ${DateTime.fromISO(end).toFormat(format)}`;
}

export function formatPretty(input) {
  const date = DateTime.fromISO(input);
  return date.toFormat("cccc d LLLL");
}

export function formatYear(input) {
  const date = DateTime.fromISO(input);
  return date.toFormat("yyyy");
}

export function formatMonthYear(input) {
  const date = DateTime.fromISO(input);
  return date.toFormat("LLLL yyyy");
}

export function formatDateNumber(input) {
  const date = DateTime.fromISO(input);
  return date.toFormat("d");
}

export function formatISO(input) {
  if (!input) return;
  return DateTime.fromISO(input).toFormat("yyyy-LL-dd");

  // let date;

  // if (input) {
  // date = DateTime.fromISO(input);
  // } else {
  // date = getToday();
  // }
  // return date.toFormat("yyyy-LL-dd");
}

export function formatWithSlashes(input) {
  const date = DateTime.fromISO(input);
  return date.toFormat("dd/LL/yyyy");
}

export function getMonths(numberOfMonths) {
  const currentMonth = getToday().startOf("month");

  const months = Array.from({ length: numberOfMonths }, (_, i) => {
    return currentMonth.plus({ months: i });
  });

  return months;
}

export function isBetweenExclusive(date, startDate, endDate) {
  const isAfterStart = date > startDate;
  const isBeforeEnd = date < endDate;
  const isBetween = isAfterStart && isBeforeEnd;
  return isBetween;
}

export function isBetweenInclusive(date, startDate, endDate) {
  const isBeforeStart = date < startDate;
  const isAfterEnd = date > endDate;
  const isBetween = !isBeforeStart && !isAfterEnd;
  return isBetween;
}

export function isAfter(d1, d2) {
  const firstDate = DateTime.fromISO(d1);
  const secondDate = DateTime.fromISO(d2);
  return firstDate > secondDate;
}

export function isBefore(d1, d2) {
  const firstDate = DateTime.fromISO(d1);
  const secondDate = DateTime.fromISO(d2);
  return firstDate < secondDate;
}

export function isToday(ISO) {
  const date = DateTime.fromISO(ISO);
  const today = getToday();
  return today.hasSame(date, "day");
}

export function isBeforeToday(ISO) {
  const date = DateTime.fromISO(ISO);
  const today = getToday();
  return date < today;
}

export function isAfterToday(ISO) {
  const date = DateTime.fromISO(ISO);
  const today = getToday();
  return date > today;
}

export function isCurrentMonth(ISO) {
  const date = DateTime.fromISO(ISO);
  const currentMonth = getCurrentMonth();
  return currentMonth.hasSame(date, "month");
}

export function isSameDay(d1, d2) {
  const firstDate = DateTime.fromISO(d1);
  const secondDate = DateTime.fromISO(d2);

  return firstDate.hasSame(secondDate, "day");
}

export function getToday() {
  return DateTime.local();
}

export function getWeekdaysShort() {
  // return Info.weekdays("short");
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
}

export function getCurrentMonth() {
  const month = getToday().startOf("month");
  return month;
}

export function getPreviousMonth(ISO) {
  const date = DateTime.fromISO(ISO);
  return date.minus({ months: 1 });
}

export function getNextMonth(ISO) {
  const date = DateTime.fromISO(ISO);
  return date.plus({ months: 1 });
}

export function getStartOfDay(ISO) {
  const date = DateTime.fromISO(ISO);
  return date.startOf("day");
}

export function getDaysOfMonth(ISO) {
  const date = DateTime.fromISO(ISO);
  const lengthOfMonth = date.daysInMonth;
  const startOfMonth = date.startOf("month");

  const days = Array.from({ length: lengthOfMonth }, (_, i) => {
    return startOfMonth.plus({ days: i });
  });

  return days;
}

export function getDaysOfMonthForLayout(ISO) {
  const date = DateTime.fromISO(ISO);
  const lengthOfMonth = date.daysInMonth;
  const startOfMonth = date.startOf("month");

  const days = Array.from({ length: lengthOfMonth }, (_, i) => {
    return startOfMonth.plus({ days: i });
  });

  const firstDayOfMonth = startOfMonth.toFormat("c");
  const spacers = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return { spacers, days };
}
