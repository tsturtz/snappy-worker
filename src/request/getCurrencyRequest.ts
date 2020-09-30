import fetch from "../fetch";

export type Response = {
  Valute: {
    USD: { Name: string; Value: number };
    EUR: { Name: string; Value: number };
  };
};

const currencyRequest = async () => {
  try {
    const {
      Valute: { USD, EUR },
    }: Response = await (
      await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    ).json();

    return {
      usd: { name: USD.Name, value: USD.Value },
      eur: { name: EUR.Name, value: EUR.Value },
    };
  } catch (error) {
    throw error;
  }
};

export default currencyRequest;
