import setRandomDialogName from "./handlers/setRandomDialogName";
import getCurrency from "./handlers/getCurrency";
import getNews from "./handlers/getNews";
import getQuote from "./handlers/getQuote";
import start from "./handlers/start";
import getWhatDayToday from "./handlers/getWhatDayToday";
import getBotCommands from "./handlers/getBotCommands";
import setDialogName from './handlers/setDialogName';

import VkBot, { Command, CommandHandler, commands } from "./VkBot";
import getSite from "./handlers/getSite";

const bot = new VkBot();

const handlers: Record<Command, CommandHandler> = {
  старт: start,
  "какой сегодня день": getWhatDayToday,
  "случайное название чата": setRandomDialogName,
  "курс доллара": getCurrency,
  "курс евро": getCurrency,
  новость: getNews,
  цитатка: getQuote,
  "caйтик ботяры": getSite,
  команды: getBotCommands,
  "изменить название": setDialogName,
};

commands.forEach((command) => bot.command(command, handlers[command]));

export default bot;
