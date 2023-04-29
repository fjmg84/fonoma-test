import { ValuesQuery, ValuesResponse } from "@/interfaces";
import { getConvert } from "@/utils/services";
import { useCallback, useRef, useState } from "react";

export function useGetConvert() {
  const [isError, setError] = useState({
    state: false,
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<ValuesResponse>({});
  const prevValues = useRef<ValuesQuery>();

  const handleRequest = useCallback(({ amount, from, to }: ValuesQuery) => {
    if (
      prevValues.current?.amount === amount &&
      prevValues.current.from === from &&
      prevValues.current.to === to
    )
      return;
    else {
      prevValues.current = { amount, from, to };
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
    }
  }, []);

  return { isError, isLoading, values, handleRequest };
}
