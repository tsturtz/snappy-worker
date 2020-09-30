import { Router } from "express";
import { bestDialogID } from "./constants";
import server from "./server";
import vkBot from "./vk/bot";

const router = Router();

router.post("/vk-bot", vkBot.webhook);

server(router, () => {
  vkBot.send(bestDialogID, "Я родился! 🐣");
});
