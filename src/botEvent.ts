import { EventEmitter } from "events";
import { BotAction, BotMessage } from "./types";

type Data = BotMessage["object"]["message"];

export type Listener = (data: Data) => void;

const eventEmitter = new EventEmitter();

const on = (event: BotAction, listener: Listener) => {
  eventEmitter.on(event, listener);
};

const emit = (event: BotAction, data: Data) => {
  eventEmitter.emit(event, data);
};

export default { on, emit };
