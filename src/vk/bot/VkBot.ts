import { EventEmitter } from "events";
import { Request, Response } from "express";
import { CONFIRMATION } from "../../config";
import { WebhookRequest } from "./types";
import VkBotCommand from "./VkBotCommand";
import { sendMessage } from "../api/methods";

export type CommandHandler = (context: VkBotCommand, args: string) => void;

export const commands = [
  "старт" as const,
  "какой сегодня день" as const,
  "случайное название чата" as const,
  "курс доллара" as const,
  "курс евро" as const,
  "новость" as const,
  "цитатка" as const,
  "caйтик ботяры" as const,
  "команды" as const,
];

export type Command = typeof commands[0];
export type CommandMeta = { description: string };

export const commandsMeta: Record<Command, CommandMeta> = {
  старт: { description: "Загрузить все кнопки с командами" },
  "какой сегодня день": { description: "Получить случайное название дня" },
  "случайное название чата": {
    description: "Изменяет название чата на название случайного дня",
  },
  "курс доллара": { description: "Получить курс доллара и евро" },
  "курс евро": { description: "Получить курс евро и доллара" },
  новость: { description: "Получить случайную новость" },
  цитатка: { description: "Получить случайную цитатку" },
  "caйтик ботяры": { description: "Получить ссылку на сайт бота" },
  команды: { description: "Получить все команды бота" },
};

class VkBot {
  private eventEmitter = new EventEmitter();

  private parseCommand(commandString: string) {
    const [command, stringParams = ""] = commandString
      .replace(/\[.*\]/g, "")
      .trim()
      .split(":");

    return {
      command: command.toLowerCase(),
      args: stringParams.trim(),
    };
  }

  webhook = (req: Request, res: Response) => {
    const {
      type,
      object: { message },
    } = req.body as WebhookRequest;

    if (type === "confirmation") {
      return res.send(CONFIRMATION);
    }
    if (type === "message_new") {
      const { command, args } = this.parseCommand(message.text);

      this.eventEmitter.emit(command, new VkBotCommand(message), args);
    }

    console.log(req.body);

    return res.send("ok");
  };

  command = (command: string, commandCallback: CommandHandler) => {
    this.eventEmitter.on(command, commandCallback);
  };

  send = async (dialogID: number, message: string) => {
    try {
      await sendMessage(dialogID, message);
    } catch (error) {}
  };
}

export default VkBot;
