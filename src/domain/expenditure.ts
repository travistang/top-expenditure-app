import { Mutex } from "async-mutex";
import Dexie, { Table } from "dexie";
import {
  RegularExpenditureSettings,
  getOccurrenceTimeInRange,
  isTimeRangeOverlapWithInterval,
} from "./regular-expenditure";

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

export type RegularExpenditure = Expenditure & {
  repeat: RegularExpenditureSettings;
};

export type RegularExpenditureWithId = RegularExpenditure & {
  id: string;
};

export type Budget = {
  amount: number;
  effectiveSince: number;
};

export type CategoryWithId = {
  name: string;
  id: string;
  color?: string;
  icon?: string;
  budget?: Budget;
};
export type CategoryWithBudget = CategoryWithId & {
  budget: Budget;
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

  async getExpenditureById(id: string) {
    return this.expenditures.get(id);
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

  async updateExpenditure(
    id: string,
    data: Partial<ExpenditureWithId>
  ): Promise<string | null> {
    return this.expenditures
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
      .and((exp) => !exp.repeat)
      .sortBy("date");
  }

  async getRegularExpendituresOccurrenceInTimeRange(
    from: number,
    to: number
  ): Promise<RegularExpenditureWithId[]> {
    const regularExpenditures = (await this.expenditures
      .filter((exp) =>
        !exp.repeat
          ? false
          : isTimeRangeOverlapWithInterval(exp as RegularExpenditure, from, to)
      )
      .toArray()) as RegularExpenditureWithId[];

    return regularExpenditures.flatMap((regularExp) => {
      const occurrences = getOccurrenceTimeInRange(regularExp, from, to);
      return occurrences.map<RegularExpenditureWithId>((occurrence) => ({
        ...regularExp,
        date: occurrence,
      }));
    });
  }

  async deleteExpenditure(id: string) {
    return this.expenditures.delete(id);
  }
}

export const expenditureDatabase = new ExpenditureDatabase();
