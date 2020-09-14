import fetch from "./fetch";

const getRandomNames = (names: string[]) => {
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
};

let lastRequestDate = 0;
let cachedDaysNames: string[] = [];

const whatDayTodayRequest = async () => {
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
      cachedDaysNames = daysNames;

      return getRandomNames(daysNames);
    }

    return getRandomNames(cachedDaysNames);
  } catch (error) {
    throw error;
  }
};

export default whatDayTodayRequest;
