import { useCallback, useEffect, useRef, useState } from "react";

type UseFetchResult<T> = {
  result: T | null;
  loading: boolean;
  noResult: boolean;
  refetch: () => void;
};
export default function useFetch<Params, Result>(
  params: Params,
  searchFunc: (p: Params) => Promise<Result>
): UseFetchResult<Result> {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const noResult = !loading && !result;

  const refetch = useCallback(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => searchFunc(params))
      .then(setResult)
      .finally(() => setLoading(false));
  }, [searchFunc, params]);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setLoading(true);
    debounce.current = setTimeout(refetch, 500);
  }, [refetch]);

  return {
    result,
    loading,
    noResult,
    refetch,
  };
}
