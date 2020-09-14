import { BotAction } from "./types";

const parseAction = (message: string) =>
  message.replace(/\[(.*?)\]/g, "").trim() as BotAction;

export default parseAction;
