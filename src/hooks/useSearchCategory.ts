import { useEffect, useRef, useState } from "react";
import { CategoryWithId, expenditureDatabase } from "../domain/expenditure";

type UseSearchCategoryResult = {
  results: CategoryWithId[];
  loading: boolean;
};
export default function useSearchCategory(
  searchString: string
): UseSearchCategoryResult {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CategoryWithId[]>([]);
  useEffect(() => {
    if (searchString) setLoading(true);
    if (debounce.current) clearTimeout(debounce.current);
    setTimeout(() => {
      if (!searchString) {
        setLoading(false);
        setResults([]);
        return;
      }
      expenditureDatabase
        .searchCategories(searchString)
        .then(setResults)
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 500);
  }, [searchString]);
  return {
    loading,
    results,
  };
}
