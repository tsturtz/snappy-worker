import { CommandHandler, commands, commandsMeta } from "../VkBot";

const getBotCommands: CommandHandler = (ctx) => {
  try {
    const message = commands
      .map((command) => `${command} - ${commandsMeta[command].description}`)
      .join("\n");

    ctx.reply(message);
  } catch (error) {}
};

export default getBotCommands;
