import { Collection } from "dexie";
import { containsSubstring, equalCaseInsensitive } from "../utils/strings";
import { ExpenditureWithId, expenditureDatabase } from "./expenditure";

export type SearchParams = {
  searchString: string;
  category: string;
  page: number;
  pageSize: number;
  fromDate?: number;
  toDate?: number;
  minimumAmount?: number;
  maximumAmount?: number;
};

export type ExpenditureSearchResult = {
  results: ExpenditureWithId[];
  pagesAvailable: number;
};

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
  searchString: "",
  category: "",
  page: 0,
  pageSize: 15,
};

class ExpenditureSearcher {
  private getCollectionBySearch(
    params: SearchParams
  ): Collection<ExpenditureWithId> {
    return expenditureDatabase.expenditures.filter((exp) => {
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

  async getPagesForSearch(params: SearchParams): Promise<number> {
    return this.getCollectionBySearch(params).count();
  }
  async searchExpenditures(
    params: Partial<SearchParams>
  ): Promise<ExpenditureWithId[]> {
    const finalParams = {
      ...DEFAULT_SEARCH_PARAMS,
      ...params,
    };
    return this.getCollectionBySearch(finalParams)
      .limit(finalParams.pageSize)
      .offset(finalParams.page * finalParams.pageSize)
      .reverse()
      .sortBy("date");
  }
}

const expenditureSearcher = new ExpenditureSearcher();
export default expenditureSearcher;
