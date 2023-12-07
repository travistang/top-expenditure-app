import {
  eachDayOfInterval,
  getDate,
  getDay,
  getMonth,
  isBefore,
} from "date-fns";
import { RegularExpenditure } from "./expenditure";

export enum RegularExpenditureInterval {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayMonth = {
  month: Month;
  day: number;
};

export type DailyRegularExpenditureInterval = {
  interval: RegularExpenditureInterval.Daily;
  endDate?: number;
};
export type WeeklyRegularExpenditureInterval = {
  interval: RegularExpenditureInterval.Weekly;
  weekdays: Weekday[];
  endDate?: number;
};
export type MonthlyRegularExpenditureInterval = {
  interval: RegularExpenditureInterval.Monthly;
  days: number[];
  endDate?: number;
};
export type YearlyRegularExpenditureInterval = {
  interval: RegularExpenditureInterval.Yearly;
  days: DayMonth[];
  endDate?: number;
};

export const DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS: Record<
  RegularExpenditureInterval,
  RegularExpenditureSettings
> = {
  [RegularExpenditureInterval.Daily]: {
    interval: RegularExpenditureInterval.Daily,
  },
  [RegularExpenditureInterval.Weekly]: {
    interval: RegularExpenditureInterval.Weekly,
    weekdays: [],
  },
  [RegularExpenditureInterval.Monthly]: {
    interval: RegularExpenditureInterval.Monthly,
    days: [],
  },
  [RegularExpenditureInterval.Yearly]: {
    interval: RegularExpenditureInterval.Yearly,
    days: [],
  },
};

export type RegularExpenditureSettings =
  | DailyRegularExpenditureInterval
  | WeeklyRegularExpenditureInterval
  | MonthlyRegularExpenditureInterval
  | YearlyRegularExpenditureInterval;

export const isTimeInRepeatInterval = (
  settings: RegularExpenditureSettings,
  time = Date.now()
) => {
  const { endDate, interval } = settings;
  const isTimeBeforeEndDate = !endDate || isBefore(time, endDate);
  if (!isTimeBeforeEndDate) return false;
  switch (interval) {
    case RegularExpenditureInterval.Daily:
      return true;
    case RegularExpenditureInterval.Weekly:
      return settings.weekdays.includes(getDay(time));
    case RegularExpenditureInterval.Monthly:
      return settings.days.includes(getDate(time));
    case RegularExpenditureInterval.Yearly:
      return !!settings.days.find(
        ({ day, month }) =>
          getDate(time) === day && getMonth(month) === month - 1
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
  settings: RegularExpenditureSettings,
  from: number,
  to: number
) => {
  return eachDayOfInterval({
    start: from,
    end: to,
  })
    .filter((date) => isTimeInRepeatInterval(settings, date.getTime()))
    .map((d) => d.getTime());
};

export const averageExpenditurePerMonth = (
  expenditure: RegularExpenditure
): number => {
  const { repeat } = expenditure;
  switch (repeat.interval) {
    case RegularExpenditureInterval.Daily:
      return expenditure.amount * 30;
    case RegularExpenditureInterval.Weekly:
      return expenditure.amount * 4;
    case RegularExpenditureInterval.Monthly:
      return expenditure.amount * repeat.days.length;
    case RegularExpenditureInterval.Yearly:
      return (expenditure.amount * repeat.days.length) / 12;
  }
};
