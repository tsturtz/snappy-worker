export default class FetchError extends Error {
  message = "Ошибка запроса на сторонний ресурс 🤯";

  constructor(error: Error) {
    super(error.message);

    console.log(`${this.message}: `, error);
  }
}
