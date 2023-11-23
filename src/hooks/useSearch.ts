import { useCallback, useEffect, useRef, useState } from "react";

type UseSearchResult<T> = {
  results: T[];
  loading: boolean;
  noResult: boolean;
  refetch: () => void;
};
export default function useSearch<Params, Result>(
  params: Params,
  searchFunc: (p: Params) => Promise<Result[]>,
  paramsCompareFunc?: (a: Params | null, b: Params | null) => boolean
): UseSearchResult<Result> {
  const previousParams = useRef<Params | null>(null);
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const refetch = useCallback(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => searchFunc(params))
      .then(setResults)
      .finally(() => setLoading(false));
  }, [searchFunc, params]);
  const noResult = !loading && !results.length;

  useEffect(() => {
    if (paramsCompareFunc?.(previousParams.current, params)) {
      return;
    }
    previousParams.current = params;
    if (debounce.current) clearTimeout(debounce.current);
    setLoading(true);
    debounce.current = setTimeout(() => {
      refetch();
    }, 500);
  }, [refetch, params, paramsCompareFunc]);

  return {
    refetch,
    results,
    loading,
    noResult,
  };
}
