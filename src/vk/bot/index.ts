import FetchError from "../../fetch/FetchError";
import { formatCurrency } from "../../helpers";
import currencyRequest from "../../request/getCurrencyRequest";
import { getRandomDayNameRequest } from "../../request/getDayNamesRequest";
import { getRandomNewsRequest } from "../../request/getNewsRequest";

import VkBot, { CommandCallback } from "./VkBot";

const bot = new VkBot();

bot.command("старт", (ctx) => {
  try {
    ctx.reply("✅", {
      inline: false,
      one_time: false,
      buttons: [
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "Изменить название",
            },
            color: "positive",
          },
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "3"}',
              label: "Курс доллара",
            },
            color: "secondary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "4"}',
              label: "Какой сегодня день",
            },
            color: "secondary",
          },
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "5"}',
              label: "Цитатка",
            },
            color: "secondary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "6"}',
              label: "Новость",
            },
            color: "secondary",
          },
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "7"}',
              label: "Caйтик ботяры",
            },
            color: "secondary",
          },
        ],
      ],
    });
  } catch (error) {}
});

bot.command("какой сегодня день", async (ctx) => {
  try {
    const day = await getRandomDayNameRequest();

    ctx.reply(day);
  } catch (error) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
});

bot.command("изменить название", async (ctx) => {
  try {
    const day = await getRandomDayNameRequest();

    ctx.editDialogName(day);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
});

export const getCurrencyHandler: CommandCallback = async (ctx) => {
  try {
    const { usd, eur } = await currencyRequest();

    const text = [
      `💵 Доллар: ${formatCurrency(usd.value, "USD")}`,
      `💶 Евро: ${formatCurrency(eur.value, "EUR")}`,
    ].join("\n");

    ctx.reply(text);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
};

bot.command("курс доллара", getCurrencyHandler);
bot.command("курс евро", getCurrencyHandler);

bot.command("новость", async (ctx) => {
  try {
    const news = await getRandomNewsRequest();
    const text = [`⭕ ${news.title}`, news.description, news.link].join("\n\n");

    ctx.reply(text);
  } catch (error) {
    if (error instanceof FetchError) {
      ctx.reply(error.message);
    }
  }
});

bot.command("caйтик ботяры", (ctx) => {
  try {
    ctx.reply("https://snappy-worker.ru/");
  } catch (error) {}
});

export default bot;
