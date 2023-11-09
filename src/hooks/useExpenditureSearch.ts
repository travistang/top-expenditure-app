import { useEffect, useRef, useState } from "react";
import { ExpenditureWithId } from "../domain/expenditure";
import expenditureSearcher, {
  SearchParams,
} from "../domain/expenditure-search";

export default function useExpenditureSearch(params: SearchParams) {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<ExpenditureWithId[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setLoading(true);
    debounce.current = setTimeout(() => {
      expenditureSearcher
        .searchExpenditures(params)
        .then(setResults)
        .finally(() => setLoading(false));
    }, 500);
  }, [params]);

  return {
    results,
    loading,
  };
}
