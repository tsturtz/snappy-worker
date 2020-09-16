import fetch from "node-fetch";
import { ACCESS_TOKEN, VK_API_VERSION, VK_API_ENDPOINT } from "./config";
import { GroupPost } from "./types";

const vkApiRequest = async <R = void>(
  method: string,
  data: any
): Promise<R> => {
  try {
    const params = new URLSearchParams();
    params.append("random_id", `${Math.round(Math.random() * 10 ** 17)}`);

    for (let key in data) {
      const value = data[key];
      params.append(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    }

    params.append("access_token", ACCESS_TOKEN);
    params.append("v", VK_API_VERSION);

    const response = await (
      await fetch(`${VK_API_ENDPOINT}${method}?${params.toString()}`)
    ).json();

    if (response.error) {
      throw response.error;
    }

    return response;
  } catch (error) {
    console.error("VK api request error:", error);

    throw error;
  }
};

export const sendMessage = (
  peer_id: number,
  message: string,
  attachment?: string
) => {
  vkApiRequest("messages.send", {
    peer_id,
    message,
    attachment,
  });
};

export const editChat = (chat_id: number, title: string) => {
  vkApiRequest("messages.editChat", { chat_id, title });
};

export const getGroupPosts = async (owner_id: number, count: number) => {
  const { items } = await vkApiRequest<GroupPost>("wall.get", {
    owner_id: -owner_id,
    count,
    filter: "owner",
    extended: 0,
  });

  return items;
};
