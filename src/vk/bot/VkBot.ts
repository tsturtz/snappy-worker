import { EventEmitter } from "events";
import { Request, Response } from "express";
import { CONFIRMATION } from "../../config";
import { WebhookRequest } from "./types";
import VkBotCommand from "./VkBotCommand";
import { sendMessage } from "../api/methods";

export type CommandHandler = (data: VkBotCommand) => void;

class VkBot {
  private eventEmitter = new EventEmitter();
  private commands: string[] = [];

  webhook = (req: Request, res: Response) => {
    const { type, object } = req.body as WebhookRequest;

    if (type === "confirmation") {
      return res.send(CONFIRMATION);
    }
    if (type === "message_new") {
      const command =
        this.commands.find((command) =>
          object.message.text.toLowerCase().includes(command)
        ) || "";

      this.eventEmitter.emit(command, new VkBotCommand(object.message));
    }

    console.log(req.body);

    return res.send("ok");
  };

  command = (command: string, commandCallback: CommandHandler) => {
    this.commands.push(command);
    this.eventEmitter.on(command, commandCallback);
  };

  send = async (dialogID: number, message: string) => {
    try {
      await sendMessage(dialogID, message);
    } catch (error) {}
  };
}

export default VkBot;
