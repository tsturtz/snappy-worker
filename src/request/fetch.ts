import nodeFetch from "node-fetch";

type Method = "GET" | "POST";

export class RequestError {
  message = "Что-то не так, попробуй еще раз 🤯";
}

const fetch = async (url: string, method: Method = "GET", data?: any) => {
  try {
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    return await nodeFetch(url, requestOptions);
  } catch (error) {
    console.log("Request error:", error);

    throw new RequestError();
  }
};

export default fetch;
