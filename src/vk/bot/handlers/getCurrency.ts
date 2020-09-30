import FetchError from "../../../fetch/FetchError";
import { formatCurrency } from "../../../helpers";
import currencyRequest from "../../../request/getCurrencyRequest";
import { CommandHandler } from "../VkBot";

const getCurrency: CommandHandler = async (ctx) => {
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

export default getCurrency;
