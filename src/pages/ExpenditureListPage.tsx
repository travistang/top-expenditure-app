import { useState } from "react";
import ExpenditureRecord from "../components/ExpenditureRecord";
import ExpenditureSearchForm from "../components/ExpenditureSearchForm";
import List from "../components/List/list";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import expenditureSearcher, {
  DEFAULT_SEARCH_PARAMS,
  SearchParams,
} from "../domain/expenditure-search";
import useSearch from "../hooks/useSearch";
import { createUpdater } from "../utils/objects";

const searchFunc = (p: SearchParams) =>
  expenditureSearcher.searchExpenditures(p);

export default function ExpenditureListPage() {
  const [params, setParams] = useState<SearchParams>(DEFAULT_SEARCH_PARAMS);
  const { results, loading } = useSearch(params, searchFunc);
  const searchParamsUpdater = createUpdater(params, setParams);

  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-y-auto">
      <ExpenditureSearchForm
        searchParams={params}
        onChangeSearchParams={searchParamsUpdater}
      />
      <List
        loading={loading}
        placeholder={<ExpenditureRecordPlaceholder />}
        noResultMessage="No search results"
        items={results}
      >
        {(expenditure) => (
          <ExpenditureRecord key={expenditure.id} expenditure={expenditure} />
        )}
      </List>
    </div>
  );
}
