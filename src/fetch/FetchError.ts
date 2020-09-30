export default class FetchError {
  message = "Ошибка запроса на сторонний ресурс 🤯";

  constructor(error: Error) {
    console.log(`${this.message}: `, error);
  }
}
