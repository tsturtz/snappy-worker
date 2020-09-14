import fetch from "./fetch";

export type Response = {
  Valute: {
    USD: { Name: string; Value: number };
    EUR: { Name: string; Value: number };
  };
};

export type Result = {
  usd: { name: string; value: number };
  eur: { name: string; value: number };
};

let lastRequestDate = 0;
let cachedCurrency: Result;

const currencyRequest = async () => {
  try {
    const currentDate = new Date().getDate();

    if (lastRequestDate !== currentDate) {
      lastRequestDate = currentDate;

      const {
        Valute: { USD, EUR },
      }: Response = await (
        await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      ).json();

      cachedCurrency = {
        usd: { name: USD.Name, value: USD.Value },
        eur: { name: EUR.Name, value: EUR.Value },
      };

      return cachedCurrency;
    }

    return cachedCurrency;
  } catch (error) {
    throw error;
  }
};

export default currencyRequest;
