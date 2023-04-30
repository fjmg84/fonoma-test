import { ValuesQuery } from "@/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_API_LAYER;

export const getCurrentSymbol = async () => {
  let headersList = {
    Accept: "*/*",
    apikey: API_KEY as string,
  };

  let response = await fetch(
    "https://api.apilayer.com/exchangerates_data/symbols",
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

export const getConvert = async ({ amount, from, to }: ValuesQuery) => {
  let headersList = {
    Accept: "*/*",
    apikey: API_KEY as string,
  };

  let response = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${Number(
      amount
    )}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};
