import { WebhookMessage } from "./types";
import { sendMessage, editDialogName } from "../api/methods";

class VkBotCommand {
  constructor(private message: WebhookMessage) {}

  async reply(text: string, keyboard?: any) {
    try {
      await sendMessage(this.message.peer_id, text, keyboard);
    } catch (error) {}
  }

  async editDialogName(newTitle: string) {
    try {
      const basePublicDialogID = 2000000000;
      editDialogName(this.message.peer_id - basePublicDialogID, newTitle);
    } catch (error) {}
  }
}

export default VkBotCommand;
