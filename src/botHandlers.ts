import botEvent, { Listener } from "./botEvent";
import currencyRequest from "./request/currencyRequest";
import { RequestError } from "./request/fetch";
import getQuoteRequest from "./request/getQuoteRequest";
import whatDayTodayRequest from "./request/whatDayTodayRequest";
import { editChat, sendMessage } from "./vkApi";

botEvent.on("какой сегодня день", async (message) => {
  try {
    const dayToday = await whatDayTodayRequest();
    sendMessage(message.peer_id, `✅ ${dayToday}`);
  } catch (error: unknown) {
    if (error instanceof RequestError) {
      sendMessage(message.peer_id, error.message);
    }
  }
});

botEvent.on("изменить название", async (message) => {
  try {
    const dayToday = await whatDayTodayRequest();

    editChat(message.peer_id - 2000000000, dayToday);
  } catch (error: unknown) {
    if (error instanceof RequestError) {
      sendMessage(message.peer_id, error.message);
    }
  }
});

const currencyHandler: Listener = async (message) => {
  try {
    const { usd, eur } = await currencyRequest();

    const text = [
      `💵 Доллар: ${usd.value.toFixed(1)}`,
      `💶 Евро: ${eur.value.toFixed(1)}`,
    ].join("\n");

    sendMessage(message.peer_id, text);
  } catch (error: unknown) {
    if (error instanceof RequestError) {
      sendMessage(message.peer_id, error.message);
    }
  }
};

botEvent.on("курс доллара", currencyHandler);
botEvent.on("курс евро", currencyHandler);

botEvent.on("цитатка", async (message) => {
  try {
    const quote = await getQuoteRequest();

    sendMessage(message.peer_id, quote);
  } catch (error: unknown) {
    if (error instanceof RequestError) {
      sendMessage(message.peer_id, error.message);
    }
  }
});
