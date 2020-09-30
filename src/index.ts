import server from "./server";
import vkBot from "./vk/bot";

server([{ method: "post", path: "/vk-bot", handler: vkBot.webhook }]);
