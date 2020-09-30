export default class VkApiError extends Error {
  message = "Ошибка VK api 🤯";

  constructor(error: Error) {
    super(error.message);

    console.error(`${this.message}: `, error);
  }
}
