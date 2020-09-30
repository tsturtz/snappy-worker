import FetchError from "../../../fetch/FetchError";
import { getRandomNewsRequest } from "../../../request/getNewsRequest";
import { CommandHandler } from "../VkBot";

const getNews: CommandHandler = async (ctx) => {
  try {
    const news = await getRandomNewsRequest();
    const text = [`⭕ ${news.title}`, news.description, news.link].join("\n\n");

    ctx.reply(text);
  } catch (error) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
};

export default getNews;
