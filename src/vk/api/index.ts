import fetch from "node-fetch";
import { ACCESS_TOKEN } from "../../config";
import VkApiError from "./VkApiError";

const vkApiRequest = async (method: string, data: any) => {
  try {
    const params = new URLSearchParams();

    for (let key in data) {
      const value = data[key];

      if (value !== undefined) {
        params.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        );
      }
    }

    params.append("random_id", `${Math.round(Math.random() * 10 ** 17)}`);
    params.append("access_token", ACCESS_TOKEN);
    params.append("v", "5.124");

    const response = await (
      await fetch(`https://api.vk.com/method/${method}?${params.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (response.error) {
      throw response.error;
    }
  } catch (error) {
    throw new VkApiError(error);
  }
};

export default vkApiRequest;
