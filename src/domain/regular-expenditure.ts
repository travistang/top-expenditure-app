import {
  eachDayOfInterval,
  getDate,
  getDay,
  getMonth,
  isBefore,
} from "date-fns";
import { ByCurrency } from "./currency";
import { RepeatInterval, Repeatable, monthlyAverageFromRepeat } from "./repeat";

export const isTimeInRepeatInterval = (
  repeatable: Repeatable,
  time = Date.now()
) => {
  const { date, startDate, repeat: settings } = repeatable;
  const usingStartDate = startDate ?? date;
  const { endDate, interval } = settings;
  if (usingStartDate && isBefore(time, usingStartDate)) return false;
  const isTimeBeforeEndDate = !endDate || isBefore(time, endDate);
  if (!isTimeBeforeEndDate) return false;
  switch (interval) {
    case RepeatInterval.Daily:
      return true;
    case RepeatInterval.Weekly:
      return settings.weekdays.includes(getDay(time));
    case RepeatInterval.Monthly:
      return settings.days.includes(getDate(time));
    case RepeatInterval.Annually:
      return !!settings.days.find(
        ({ day, month }) => getDate(time) === day && getMonth(time) === month
      );
  }
};

export const isTimeRangeOverlapWithInterval = (
  repeatable: Repeatable,
  from: number,
  to: number
) => {
  const {
    date,
    startDate,
    repeat: { endDate },
  } = repeatable;
  const usingStartDate = startDate ?? date;
  if (usingStartDate && to < usingStartDate) return false;
  if (endDate && endDate < from) return false;
  return true;
};

export const getOccurrenceTimeInRange = (
  repeatable: Repeatable,
  from: number,
  to: number
) => {
  return eachDayOfInterval({
    start: from,
    end: to,
  })
    .filter((date) => isTimeInRepeatInterval(repeatable, date.getTime()))
    .map((d) => d.getTime());
};

export const getRepeatableByCurrency = (repeatables: Repeatable[]) => {
  return repeatables.reduce((acc, expenditure) => {
    const { amount, currency, repeat } = expenditure;
    const monthlyAmount = monthlyAverageFromRepeat(amount, repeat);
    acc[currency] = (acc[currency] ?? 0) + monthlyAmount;
    return acc;
  }, {} as ByCurrency<number>);
};
