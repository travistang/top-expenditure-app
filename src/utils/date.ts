import { DayMonth, Month, Weekday } from "../domain/regular-expenditure";

const WEEKDAYS: Weekday[] = [1, 2, 3, 4, 5];
const WEEKENDS: Weekday[] = [0, 6];
const EVERYDAY = [...WEEKDAYS, ...WEEKENDS];
const WEEKDAY_NAME: Record<Weekday, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const MONTH_NAME: Record<Month, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const weekdayDescription = (weekdays: Weekday[]) => {
  if (weekdays.length === 0) return "";
  if (weekdays.every((day) => EVERYDAY.includes(day))) return "everyday";
  if (WEEKDAYS.every((day) => weekdays.includes(day))) return "weekdays";
  if (WEEKENDS.every((day) => weekdays.includes(day))) return "weekend";
  return Array.from(new Set(weekdays))
    .sort()
    .map((day) => WEEKDAY_NAME[day])
    .join(",");
};

export const dayDescription = (day: number) => {
  if (day === 11 || day === 12 || day === 13) {
    return `${day}$th`;
  }
  const lastDigit = day % 10;
  let ending = "th";
  if (lastDigit === 1) ending = "st";
  if (lastDigit === 2) ending = "nd";
  if (lastDigit === 3) ending = "rd";
  return `${day}${ending}`;
};

export const dayMonthDescription = (dayMonth: DayMonth) => {
  const dayDesc = dayDescription(dayMonth.day);
  return `${dayDesc} ${MONTH_NAME[dayMonth.month]}`;
};
