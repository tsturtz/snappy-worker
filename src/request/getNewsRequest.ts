import xmlParser from "fast-xml-parser";
import fetch, { RequestError } from "./fetch";

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
      throw new RequestError();
    }
  } catch (error) {
    throw error;
  }
};

export default getNewsRequest;
