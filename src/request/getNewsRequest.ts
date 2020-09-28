import xmlParser from "fast-xml-parser";
import fetch from "./fetch";

type News = {
  title: string;
  link: string;
  description: string;
};

const getNewsRequest = async () => {
  try {
    const response = await fetch(
      "https://news.yandex.ru/Rostov-na-Donu/index.rss"
    );

    const json = xmlParser.parse(await response.text());

    return json.rss.channel.item as News[];
  } catch (error) {
    throw error;
  }
};

export default getNewsRequest;
