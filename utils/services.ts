import { ValuesQuery } from "@/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_PROD_API_LAYER;

export const getCurrentSymbol = async () => {
  let headersList = {
    Accept: "*/*",
    apikey: API_KEY as string,
  };

  try {
    let response = await fetch(
      "https://api.apilayer.com/exchangerates_data/symbols",
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log("services", data);
    return data;
  } catch (error) {
    return new Error("error fetching symbols");
  }
};

export const getConvert = async ({ amount, from, to, date }: ValuesQuery) => {
  let headersList = {
    Accept: "*/*",
    apikey: API_KEY as string,
  };

  try {
    let response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${Number(
        amount
      )}&date=${date}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    return data;
  } catch (error) {
    return new Error("error fetching convert current");
  }
};
