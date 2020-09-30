import xmlParser from "fast-xml-parser";
import { newsTypes } from "../constants";
import fetch from "../fetch";
import FetchError from "../fetch/FetchError";
import { getRandomNumber } from "../helpers";

type News = {
  title: string;
  link: string;
  description: string;
};

const getNewsRequest = async (type: string) => {
  try {
    const response = await fetch(`https://news.yandex.ru/${type}.rss`);

    try {
      const json = xmlParser.parse(await response.text());

      return json.rss.channel.item as News[];
    } catch (error) {
      throw new FetchError(error);
    }
  } catch (error) {
    throw error;
  }
};

export const getRandomNewsRequest = async () => {
  try {
    const randomNewsType = newsTypes[getRandomNumber(newsTypes.length)];
    const news = await getNewsRequest(randomNewsType);
    const randomNews = news[getRandomNumber(news.length)];

    return randomNews;
  } catch (error) {
    throw error;
  }
};

export default getNewsRequest;
