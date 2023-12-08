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

export const DEFAULT_REPEAT_SETTINGS: Record<RepeatInterval, Repeat> = {
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

export const isValidRepeat = (repeat: Repeat) => {
  switch (repeat.interval) {
    case RepeatInterval.Daily:
      return true;
    case RepeatInterval.Weekly:
      return repeat.weekdays.length > 0;
    case RepeatInterval.Monthly:
    case RepeatInterval.Annually:
      return repeat.days.length > 0;
    default:
      return false;
  }
};

export const monthlyAverageFromRepeat = (amount: number, repeat: Repeat) => {
  switch (repeat.interval) {
    case RepeatInterval.Daily:
      return amount * 30;
    case RepeatInterval.Weekly:
      return amount * 4;
    case RepeatInterval.Monthly:
      return amount * repeat.days.length;
    case RepeatInterval.Annually:
      return (amount * repeat.days.length) / 12;
  }
};
