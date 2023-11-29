import { useEffect, useRef, useState } from "react";

type UseFetchResult<T> = {
  result: T | null;
  loading: boolean;
  noResult: boolean;
};
export default function useFetch<Params, Result>(
  params: Params,
  searchFunc: (p: Params) => Promise<Result>
): UseFetchResult<Result> {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const noResult = !loading && !result;

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setLoading(true);
    debounce.current = setTimeout(() => {
      searchFunc(params)
        .then(setResult)
        .finally(() => setLoading(false));
    }, 500);
  }, [params, searchFunc]);

  return {
    result,
    loading,
    noResult,
  };
}
