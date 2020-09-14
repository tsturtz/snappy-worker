import fetch from "node-fetch";
import { ACCESS_TOKEN, VK_API_VERSION, VK_API_ENDPOINT } from "./config";

const vkApiRequest = async (method: string, data: any) => {
  try {
    const params = new URLSearchParams();
    params.append("random_id", `${Math.round(Math.random() * 1000000000000)}`);

    for (let key in data) {
      const value = data[key];
      params.append(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    }

    params.append("access_token", ACCESS_TOKEN);
    params.append("v", VK_API_VERSION);

    fetch(`${VK_API_ENDPOINT}${method}?${params.toString()}`);
  } catch (error) {
    console.error("VK api request error:", error);

    throw error;
  }
};

export const sendMessage = (peer_id: number, message: string) => {
  vkApiRequest("messages.send", {
    peer_id,
    message,
  });
};

export const editChat = (chat_id: number, title: string) => {
  vkApiRequest("messages.editChat", { chat_id, title });
};
