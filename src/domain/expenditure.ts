import { Mutex } from "async-mutex";
import Dexie, { Table } from "dexie";

export enum RegularExpenditureInterval {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
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

export type RegularExpenditureSettings =
  | DailyRegularExpenditureInterval
  | WeeklyRegularExpenditureInterval
  | MonthlyRegularExpenditureInterval
  | YearlyRegularExpenditureInterval;

export type Expenditure = {
  name: string;
  date: number;
  tags: string[];
  category: string;
  amount: number;
  repeat?: RegularExpenditureSettings;
};

export const DEFAULT_EXPENDITURE: Expenditure = {
  name: "",
  date: Date.now(),
  tags: [],
  category: "",
  amount: 0,
};

export type ExpenditureWithId = Expenditure & {
  id: string;
};

export type CategoryWithId = {
  name: string;
  id: string;
  color?: string;
  icon?: string;
};

class ExpenditureDatabase extends Dexie {
  expenditures!: Table<ExpenditureWithId>;
  categories!: Table<CategoryWithId>;
  private mutex = new Mutex();

  constructor() {
    super("expenditure-app");
    this.version(1).stores({
      expenditures: "++id,name,date,category,amount,*tags",
      categories: "++id,name",
    });
  }

  private get newId(): string {
    return window.crypto.randomUUID();
  }

  async searchCategories(searchString: string) {
    return this.categories
      .where("name")
      .startsWithIgnoreCase(searchString)
      .toArray();
  }

  async getCategoryById(id: string) {
    return this.categories.get(id);
  }
  async getCategoryByName(name: string) {
    return this.categories.where("name").equalsIgnoreCase(name).first();
  }

  async updateCategory(
    id: string,
    data: Partial<CategoryWithId>
  ): Promise<string | null> {
    return this.categories
      .update(id, data)
      .then(() => id)
      .catch(() => null);
  }

  async createCategory(name: string): Promise<string | null> {
    return this.mutex.runExclusive(async () => {
      try {
        const hasExistingEntries = await this.getCategoryByName(name);
        if (hasExistingEntries) {
          return null;
        }
        const id = this.newId;
        await this.categories.add({ name, id }, id);
        return id;
      } catch {
        return null;
      }
    });
  }

  async createExpenditure(data: Expenditure): Promise<string | null> {
    return this.mutex.runExclusive(async () => {
      try {
        const existingCategory = await this.getCategoryById(data.category);
        if (!existingCategory) {
          throw new Error("Unknown category");
        }
        const id = this.newId;
        await this.expenditures.add({ ...data, id });
        return id;
      } catch {
        return null;
      }
    });
  }

  async getExpendituresInTimeRange(
    from: number,
    to: number
  ): Promise<ExpenditureWithId[]> {
    return this.expenditures
      .where("date")
      .between(from, to)
      .reverse()
      .sortBy("date");
  }

  async deleteExpenditure(id: string) {
    return this.expenditures.delete(id);
  }
}

export const expenditureDatabase = new ExpenditureDatabase();
