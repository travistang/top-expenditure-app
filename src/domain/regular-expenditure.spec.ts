import { addDays } from "date-fns";
import {
  DailyRegularExpenditureInterval,
  MonthlyRegularExpenditureInterval,
  RegularExpenditureInterval,
  WeeklyRegularExpenditureInterval,
  isTimeInRepeatInterval,
} from "./regular-expenditure";

describe("Regular expenditure interval", () => {
  beforeEach(() => {
    Date.now = jest.fn(() => new Date("2023-01-01").getTime());
  });

  it("should recognize daily expenditure interval with an end date", () => {
    const dailyRepeatInterval: DailyRegularExpenditureInterval = {
      endDate: addDays(Date.now(), 2).getTime(),
      interval: RegularExpenditureInterval.Daily,
    };
    expect(isTimeInRepeatInterval(dailyRepeatInterval, Date.now())).toBe(true);
  });

  it("should recognize daily expenditure interval without  an end date", () => {
    const dailyRepeatInterval: DailyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Daily,
    };
    expect(isTimeInRepeatInterval(dailyRepeatInterval, Date.now())).toBe(true);
  });

  it("should recognize weekly interval correctly", () => {
    const weeklyInterval: WeeklyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Weekly,
      weekdays: [2, 4],
    };
    const tuesday = new Date("2023-01-03").getTime();
    expect(isTimeInRepeatInterval(weeklyInterval, tuesday)).toBe(true);
    expect(
      isTimeInRepeatInterval(weeklyInterval, addDays(tuesday, 1).getTime())
    ).toBe(false);
  });

  it("should recognize monthly interval correctly", () => {
    const monthlyInterval: MonthlyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Monthly,
      days: [6, 12],
    };
    const twelfth = new Date("2023-01-12").getTime();
    expect(isTimeInRepeatInterval(monthlyInterval, twelfth)).toBe(true);
  });
});
