export default class VkApiError extends Error {
  message = "Ошибка VK api 🤯";

  constructor(error: Error) {
    super(error.message);
    this.name = "VkApiError";

    console.error(`${this.message}: `, error);
  }
}
