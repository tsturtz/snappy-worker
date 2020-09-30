import vkApiRequest from ".";

export const sendMessage = (
  peer_id: number,
  message?: string,
  keyboard?: any
) =>
  vkApiRequest("messages.send", {
    peer_id,
    message,
    keyboard,
  });

export const editDialogName = (chat_id: number, title: string) =>
  vkApiRequest("messages.editChat", { chat_id, title });
