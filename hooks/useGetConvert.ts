import { ValuesQuery, ValuesResponse } from "@/interfaces";
import { getConvert } from "@/utils/services";
import { useCallback, useState } from "react";

export function useGetConvert() {
  const [isError, setError] = useState({
    state: false,
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<ValuesResponse>({});

  const handleRequest = useCallback(({ amount, from, to }: ValuesQuery) => {
    setLoading(true);
    getConvert({ amount, from, to })
      .then((data) => {
        setValues(data);
      })
      .catch((error) =>
        setError({
          state: true,
          message: "Error while loading data. :-(",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  return { isError, isLoading, values, handleRequest };
}
