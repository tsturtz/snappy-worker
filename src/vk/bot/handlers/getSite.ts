import { CommandHandler } from "../VkBot";

const getSite: CommandHandler = (ctx) => {
  try {
    ctx.reply("https://snappy-worker.ru/");
  } catch (error) {}
};

export default getSite;
