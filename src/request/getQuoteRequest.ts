import fetch from "./fetch";

type Response = {
  quoteText: string;
};

const getQuoteRequest = async () => {
  try {
    const maxQuoteID = 999999;
    const quoteID = Math.floor(Math.random() * maxQuoteID);
    const { quoteText }: Response = await (
      await fetch(
        `https://api.forismatic.com/api/1.0/?method=getQuote&key=${quoteID}&format=json&lang=ru`
      )
    ).json();

    return quoteText;
  } catch (error) {
    throw error;
  }
};

export default getQuoteRequest;
