import fetch from "./fetch";

let lastRequestDate = 0;
let cachedNames: string[] = [];

const getCurrentDayNamesRequest = async () => {
  try {
    const currentDate = new Date().getDate();

    if (lastRequestDate !== currentDate) {
      lastRequestDate = currentDate;
      const htmlContent = await (
        await fetch("http://kakoysegodnyaprazdnik.ru/")
      ).text();

      const daysNames = [
        ...htmlContent.matchAll(/<span itemprop="text">(.*?)<\/span>/g),
      ].flatMap((item) => item[1].split(" (")[0]);

      cachedNames = daysNames;
    }

    return cachedNames;
  } catch (error) {
    throw error;
  }
};

export default getCurrentDayNamesRequest;
