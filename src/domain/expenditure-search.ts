import { Collection } from "dexie";
import { ExpenditureWithId, expenditureDatabase } from "./expenditure";
import { containsSubstring } from "../utils/strings";

export type SearchParams = {
  searchString: string;
  page: number;
  pageSize: number;
  fromDate?: number;
  toDate?: number;
};

export type ExpenditureSearchResult = {
  results: ExpenditureWithId[];
  pagesAvailable: number;
};

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
  searchString: "",
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
      if (params.fromDate && exp.date < params.fromDate) return false;
      if (params.toDate && exp.date > params.toDate) return false;
      return true;
    });
  }

  async getPagesForSearch(params: SearchParams): Promise<number> {
    return this.getCollectionBySearch(params).count();
  }
  async searchExpenditures(params: SearchParams): Promise<ExpenditureWithId[]> {
    return this.getCollectionBySearch(params)
      .limit(params.pageSize)
      .offset(params.page * params.pageSize)
      .reverse()
      .sortBy("date");
  }
}

const expenditureSearcher = new ExpenditureSearcher();
export default expenditureSearcher;
