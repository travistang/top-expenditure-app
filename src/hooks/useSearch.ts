import { useEffect, useRef, useState } from "react";

type UseSearchResult<T> = {
  results: T[];
  loading: boolean;
  noResult: boolean;
};
export default function useSearch<Params, Result>(
  params: Params,
  searchFunc: (p: Params) => Promise<Result[]>
): UseSearchResult<Result> {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const noResult = !loading && !results.length;

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setLoading(true);
    debounce.current = setTimeout(() => {
      searchFunc(params)
        .then(setResults)
        .finally(() => setLoading(false));
    }, 500);
  }, [params, searchFunc]);

  return {
    results,
    loading,
    noResult,
  };
}
