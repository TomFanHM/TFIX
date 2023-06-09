import { useCallback, useEffect, useState } from "react";

//this hook is used to handle infinite fetch data
//it takes 1 parameter, initialData: the initial data that will be displayed

export const useInfiniteData = <TData>(initialData: TData[]) => {
  const [data, setData] = useState<TData[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const fetchData = useCallback(
    async (callback: (el: TData[]) => Promise<TData[]>) => {
      if (loading && !hasNext) return;
      setError(null); //reset error
      setLoading(true);
      try {
        const results = await callback(data); //callback function
        if (results) setData((prev) => [...prev, ...results]);
        if (!results.length) setHasNext(false);
      } catch (error) {
        if (error instanceof Error) setError(error);
        setHasNext(false);
      }
      setLoading(false);
    },
    [data, loading, hasNext]
  );

  const editData = useCallback(
    (callback: (el: TData[]) => TData[]) => {
      const editedData = callback(data);
      setData([...editedData]);
    },
    [data]
  );

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setHasNext(true);
    }
  }, [initialData]);

  return { data, fetchData, hasNext, loading, error, editData };
};
