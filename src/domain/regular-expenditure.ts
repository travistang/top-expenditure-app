import {
  eachDayOfInterval,
  getDate,
  getDay,
  getMonth,
  isBefore,
} from "date-fns";
import { RegularExpenditure } from "./expenditure";

export enum RepeatInterval {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Annually = "yearly",
}
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type DayMonth = {
  month: Month;
  day: number;
};

export type DailyRepeatInterval = {
  interval: RepeatInterval.Daily;
  endDate?: number;
};
export type WeeklyRepeatInterval = {
  interval: RepeatInterval.Weekly;
  weekdays: Weekday[];
  endDate?: number;
};
export type MonthlyRepeatInterval = {
  interval: RepeatInterval.Monthly;
  days: number[];
  endDate?: number;
};
export type AnnualRepeatInterval = {
  interval: RepeatInterval.Annually;
  days: DayMonth[];
  endDate?: number;
};

export const DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS: Record<
  RepeatInterval,
  Repeat
> = {
  [RepeatInterval.Daily]: {
    interval: RepeatInterval.Daily,
  },
  [RepeatInterval.Weekly]: {
    interval: RepeatInterval.Weekly,
    weekdays: [],
  },
  [RepeatInterval.Monthly]: {
    interval: RepeatInterval.Monthly,
    days: [],
  },
  [RepeatInterval.Annually]: {
    interval: RepeatInterval.Annually,
    days: [],
  },
};

export type Repeat =
  | DailyRepeatInterval
  | WeeklyRepeatInterval
  | MonthlyRepeatInterval
  | AnnualRepeatInterval;

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
