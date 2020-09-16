import botEvent, { Listener } from "./botEvent";
import currencyRequest from "./request/currencyRequest";
import { RequestError } from "./request/fetch";
import getQuoteRequest from "./request/getQuoteRequest";
import whatDayTodayRequest from "./request/whatDayTodayRequest";
import { editChat, getGroupPosts, sendMessage } from "./vkApi";

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

botEvent.on("хочу мем", async (message) => {
  try {
    const fourchanGroupID = 45745333;
    const postsCount = 100;

    const posts = await getGroupPosts(fourchanGroupID, postsCount);
    const postsPhotos = posts
      .flatMap((post) => post.attachments)
      .filter((attachment) => attachment.type === "photo");

    const { photo } = postsPhotos[Math.round(Math.random() * postsCount)];

    sendMessage(
      message.peer_id,
      `photo${-fourchanGroupID}_${photo.id}_${photo.access_key}`
    );
  } catch (error) {
    sendMessage(message.peer_id, "Не получилось 😔");
  }
});
