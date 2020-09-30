import changeDialogName from "./handlers/changeDialogName";
import getCurrency from "./handlers/getCurrency";
import getNews from "./handlers/getNews";
import getQuote from "./handlers/getQuote";
import start from "./handlers/start";
import getWhatDayToday from "./handlers/getWhatDayToday";

import VkBot from "./VkBot";
import getSite from "./handlers/getSite";

const bot = new VkBot();

bot.command("старт", start);

bot.command("какой сегодня день", getWhatDayToday);

bot.command("изменить название", changeDialogName);

bot.command("курс доллара", getCurrency);
bot.command("курс евро", getCurrency);

bot.command("новость", getNews);

bot.command("цитатка", getQuote);

bot.command("caйтик ботяры", getSite);

export default bot;
