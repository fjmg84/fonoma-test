export const getCurrentSymbol = async () => {
  let headersList = {
    Accept: "*/*",
    apikey: "II1qJimB6cAnX4Kh0gevC3U3N6lKh765",
  };

  let response = await fetch(
    "https://api.apilayer.com/exchangerates_data/symbols",
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
};

export const getConvert = async () => {
  let headersList = {
    Accept: "*/*",
    apikey: "II1qJimB6cAnX4Kh0gevC3U3N6lKh765",
  };

  let response = await fetch(
    "https://api.apilayer.com/exchangerates_data/convert?to=JPY&from=GBP&amount=25",
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
};
