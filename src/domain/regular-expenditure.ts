import {
  eachDayOfInterval,
  getDate,
  getDay,
  getMonth,
  isBefore,
  isSameDay,
} from "date-fns";
import { RepeatInterval, Repeatable } from "./repeat";

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

type Reading = {
  date: number;
  amount: number;
};
type ReadingsFromRecordsParams = {
  readings: Reading[];
  incomes: Repeatable[];
  expenditures: Repeatable[];
  from: number;
  to: number;
};
export const getReadingsFromRecords = ({
  readings,
  incomes,
  expenditures,
  from,
  to,
}: ReadingsFromRecordsParams): Record<number, number> => {
  const results: Record<number, number> = {};
  const datesInInterval = eachDayOfInterval({ start: from, end: to }).map((d) =>
    d.getTime()
  );
  let currentAmount = 0;
  for (const date of datesInInterval) {
    const readingsOnDate = readings.find((reading) =>
      isSameDay(date, reading.date)
    );
    if (readingsOnDate) {
      currentAmount = readingsOnDate.amount;
      results[date] = currentAmount;
      continue;
    }

    const incomesOnDay = incomes
      .filter((income) => isTimeInRepeatInterval(income, date))
      .reduce((totalIncome, income) => totalIncome + income.amount, 0);
    const expendituresOnDay = expenditures
      .filter((exp) => isTimeInRepeatInterval(exp, date))
      .reduce((totalExpenditure, exp) => totalExpenditure + exp.amount, 0);

    currentAmount += incomesOnDay - expendituresOnDay;
    results[date] = currentAmount;
  }

  return results;
};
