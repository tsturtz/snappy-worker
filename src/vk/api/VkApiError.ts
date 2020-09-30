export default class VkApiError {
  message = "Ошибка VK api 🤯";

  constructor(error: Error) {
    console.error(`${this.message}: `, error);
  }
}
