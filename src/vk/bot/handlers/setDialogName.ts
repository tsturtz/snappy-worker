import FetchError from "../../../fetch/FetchError";
import { EditDialogError } from "../errors";
import { CommandHandler } from "../VkBot";

const setDialogName: CommandHandler = async (ctx, newName) => {
  try {
    await ctx.editDialogName(newName);
  } catch (error: unknown) {
    if (error instanceof FetchError || error instanceof EditDialogError) {
      ctx.reply(error.message);
    }
  }
};

export default setDialogName;
