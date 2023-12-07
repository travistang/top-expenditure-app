import {
  eachDayOfInterval,
  getDate,
  getDay,
  getMonth,
  isBefore,
} from "date-fns";
import { RegularExpenditure } from "./expenditure";
import { RepeatInterval } from "./repeat";

export const isTimeInRepeatInterval = (
  expenditure: RegularExpenditure,
  time = Date.now()
) => {
  const { date: startDate, repeat: settings } = expenditure;
  const { endDate, interval } = settings;
  if (isBefore(time, startDate)) return false;
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
  expenditure: RegularExpenditure,
  from: number,
  to: number
) => {
  const {
    date: startDate,
    repeat: { endDate },
  } = expenditure;

  if (to < startDate) return false;
  if (endDate && endDate < from) return false;
  return true;
};

export const getOccurrenceTimeInRange = (
  expenditure: RegularExpenditure,
  from: number,
  to: number
) => {
  return eachDayOfInterval({
    start: from,
    end: to,
  })
    .filter((date) => isTimeInRepeatInterval(expenditure, date.getTime()))
    .map((d) => d.getTime());
};

export const averageExpenditurePerMonth = (
  expenditure: RegularExpenditure
): number => {
  const { repeat } = expenditure;
  switch (repeat.interval) {
    case RepeatInterval.Daily:
      return expenditure.amount * 30;
    case RepeatInterval.Weekly:
      return expenditure.amount * 4;
    case RepeatInterval.Monthly:
      return expenditure.amount * repeat.days.length;
    case RepeatInterval.Annually:
      return (expenditure.amount * repeat.days.length) / 12;
  }
};
