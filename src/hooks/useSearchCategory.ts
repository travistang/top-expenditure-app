import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryWithId, expenditureDatabase } from "../domain/expenditure";

type UseSearchCategoryResult = {
  results: CategoryWithId[];
  loading: boolean;
  refetch: () => void;
};
export default function useSearchCategory(
  searchString: string
): UseSearchCategoryResult {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CategoryWithId[]>([]);
  const refetch = useCallback(() => {
    return expenditureDatabase
      .searchCategories(searchString)
      .then(setResults)
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [searchString]);
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setTimeout(refetch, 500);
  }, [refetch]);
  return {
    loading,
    results,
    refetch,
  };
}
