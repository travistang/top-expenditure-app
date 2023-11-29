import { Collection } from "dexie";
import { endOfDay, isAfter, max, min, startOfDay } from "date-fns";
import { containsSubstring } from "../utils/strings";
import {
  ExpenditureWithId,
  RegularExpenditureWithId,
  expenditureDatabase,
} from "./expenditure";

export type SearchParams = {
  searchString: string;
  category: string;
  page: number;
  pageSize: number;
  fromDate?: number;
  toDate?: number;
  minimumAmount?: number;
  maximumAmount?: number;
  includesRepeatedExpenditure?: boolean;
};

export type ExpenditureSearchResult = {
  results: ExpenditureWithId[];
  pagesAvailable: number;
};

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
  searchString: "",
  category: "",
  page: 0,
  includesRepeatedExpenditure: false,
  pageSize: 15,
};

class ExpenditureSearcher {
  private getCollectionBySearch(
    params: SearchParams
  ): Collection<ExpenditureWithId> {
    return expenditureDatabase.expenditures.filter((exp) => {
      if (!params.includesRepeatedExpenditure && exp.repeat) return false;
      if (
        params.searchString &&
        !containsSubstring(exp.name, params.searchString)
      )
        return false;
      if (params.category && exp.category !== params.category) return false;
      if (
        params.maximumAmount !== undefined &&
        exp.amount > params.maximumAmount
      )
        return false;
      if (
        params.minimumAmount !== undefined &&
        exp.amount < params.minimumAmount
      )
        return false;
      if (params.fromDate && exp.date < params.fromDate) return false;
      if (params.toDate && exp.date > params.toDate) return false;
      return true;
    });
  }

  async getRegularExpenditures(
    includePreviousExpenditures: boolean
  ): Promise<RegularExpenditureWithId[]> {
    return this.getCollectionBySearch({
      ...DEFAULT_SEARCH_PARAMS,
      includesRepeatedExpenditure: true,
    })
      .filter((exp) => {
        if (!exp.repeat) return false;
        if (!exp.repeat.endDate) return true;
        return includePreviousExpenditures
          ? true
          : isAfter(exp.repeat.endDate, Date.now());
      })
      .toArray() as Promise<RegularExpenditureWithId[]>;
  }

  async getPagesForSearch(params: SearchParams): Promise<number> {
    return this.getCollectionBySearch(params).count();
  }

  private computeRegularExpenditureInterval(
    params: Partial<SearchParams>,
    otherExpenditures: ExpenditureWithId[]
  ): [number, number] {
    const otherExpendituresDates = otherExpenditures.map((e) => e.date);
    const hasExpenditures = otherExpendituresDates.length > 0;
    const [expFrom, expTo] = hasExpenditures
      ? [min(otherExpendituresDates), max(otherExpendituresDates)]
      : [new Date(), new Date()];
    return [
      startOfDay(params.fromDate ?? expFrom.getTime()).getTime(),
      endOfDay(params.toDate ?? expTo.getTime()).getTime(),
    ];
  }
  async searchExpenditures(
    params: Partial<SearchParams>
  ): Promise<ExpenditureWithId[]> {
    const finalParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params,
    };
    const expenditures = await this.getCollectionBySearch(finalParams)
      .limit(finalParams.pageSize)
      .offset(finalParams.page * finalParams.pageSize)
      .reverse()
      .sortBy("date");
    if (!params.includesRepeatedExpenditure) return expenditures;
    const [from, to] = this.computeRegularExpenditureInterval(
      params,
      expenditures
    );

    const regularExpenditures =
      await expenditureDatabase.getRegularExpendituresOccurrenceInTimeRange(
        from,
        to
      );
    return [...expenditures, ...regularExpenditures].sort(
      (a, b) => b.date - a.date
    );
  }
}

const expenditureSearcher = new ExpenditureSearcher();
export default expenditureSearcher;
