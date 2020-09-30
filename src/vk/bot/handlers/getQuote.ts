import FetchError from "../../../fetch/FetchError";
import getQuoteRequest from "../../../request/getQuoteRequest";
import { CommandHandler } from "../VkBot";

const getQuote: CommandHandler = async (ctx) => {
  try {
    const quote = await getQuoteRequest();

    ctx.reply(quote);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
};

export default getQuote;
