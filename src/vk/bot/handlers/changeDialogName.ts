import FetchError from "../../../fetch/FetchError";
import { getRandomDayNameRequest } from "../../../request/getDayNamesRequest";
import { EditDialogError } from "../errors";
import { CommandHandler } from "../VkBot";

const changeDialogName: CommandHandler = async (ctx) => {
  try {
    const day = await getRandomDayNameRequest();

    await ctx.editDialogName(day);
  } catch (error: unknown) {
    if (error instanceof FetchError || error instanceof EditDialogError) {
      ctx.reply(error.message);
    }
  }
};

export default changeDialogName;
