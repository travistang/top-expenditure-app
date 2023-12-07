import { addDays } from "date-fns";
import {
  DailyRegularExpenditureInterval,
  MonthlyRegularExpenditureInterval,
  RegularExpenditureInterval,
  RegularExpenditureSettings,
  WeeklyRegularExpenditureInterval,
  YearlyRegularExpenditureInterval,
  isTimeInRepeatInterval,
} from "./regular-expenditure";
import { RegularExpenditure } from "./expenditure";

const createExpenditureFromSettings = (
  settings: RegularExpenditureSettings
): RegularExpenditure => {
  return {
    repeat: settings,
    name: "",
    date: Date.now(),
    category: "",
    tags: [],
    amount: 42,
  };
};
describe("Regular expenditure interval", () => {
  beforeEach(() => {
    Date.now = jest.fn(() => new Date("2023-01-01").getTime());
  });

  it("should recognize daily expenditure interval with an end date", () => {
    const dailyRepeatInterval: DailyRegularExpenditureInterval = {
      endDate: addDays(Date.now(), 2).getTime(),
      interval: RegularExpenditureInterval.Daily,
    };
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(dailyRepeatInterval),
        Date.now()
      )
    ).toBe(true);
  });

  it("should recognize daily expenditure interval without  an end date", () => {
    const dailyRepeatInterval: DailyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Daily,
    };
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(dailyRepeatInterval),
        Date.now()
      )
    ).toBe(true);
  });

  it("should recognize weekly interval correctly", () => {
    const weeklyInterval: WeeklyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Weekly,
      weekdays: [2, 4],
    };
    const tuesday = new Date("2023-01-03").getTime();
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(weeklyInterval),
        tuesday
      )
    ).toBe(true);
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(weeklyInterval),
        addDays(tuesday, 1).getTime()
      )
    ).toBe(false);
  });

  it("should recognize monthly interval correctly", () => {
    const monthlyInterval: MonthlyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Monthly,
      days: [6, 12],
    };
    const twelfth = new Date("2023-01-12").getTime();
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(monthlyInterval),
        twelfth
      )
    ).toBe(true);
  });

  it("should recognize yearly interval correctly", () => {
    const yearlyInterval: YearlyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Yearly,
      days: [
        {
          day: 12,
          month: 0,
        },
        {
          day: 15,
          month: 4,
        },
      ],
    };
    const twelfth = new Date("2023-01-12").getTime();
    expect(
      isTimeInRepeatInterval(
        createExpenditureFromSettings(yearlyInterval),
        twelfth
      )
    ).toBe(true);
  });

  it("should ignore interval that starts after the given date", () => {
    const yearlyInterval: YearlyRegularExpenditureInterval = {
      interval: RegularExpenditureInterval.Yearly,
      days: [
        {
          day: 12,
          month: 0,
        },
        {
          day: 15,
          month: 4,
        },
      ],
    };
    const twelfth = new Date("2023-01-12").getTime();
    const expenditure = createExpenditureFromSettings(yearlyInterval);
    expenditure.date = twelfth + 1;
    expect(isTimeInRepeatInterval(expenditure, twelfth)).toBe(false);
  });
});
