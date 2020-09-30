import { WebhookMessage } from "./types";
import { sendMessage, editDialogName } from "../api/methods";
import { EditDialogError } from "./errors";

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
      const dialogID = this.message.peer_id - basePublicDialogID;

      if (dialogID > 0) {
        await editDialogName(dialogID, newTitle);
      } else {
        throw new EditDialogError();
      }
    } catch (error) {
      throw error;
    }
  }
}

export default VkBotCommand;
