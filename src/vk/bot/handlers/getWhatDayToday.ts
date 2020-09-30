import FetchError from "../../../fetch/FetchError";
import { getRandomDayNameRequest } from "../../../request/getDayNamesRequest";
import { CommandHandler } from "../VkBot";

const whatDayToday: CommandHandler = async (ctx) => {
  try {
    const day = await getRandomDayNameRequest();

    ctx.reply(day);
  } catch (error) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
};

export default whatDayToday;
