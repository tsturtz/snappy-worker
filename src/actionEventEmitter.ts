import { EventEmitter } from "events";
import { BotAction, BotMessage } from "./types";

type Data = BotMessage['object']['message'];
export type Listener = (data: Data) => void;

class ActionEventEmitter extends EventEmitter {
  listen(event: BotAction, listener: Listener) {
    this.on(event, listener);
  }

  dispatch(event: BotAction, data: Data) {
    this.emit(event, data);
  }
}

const eventEmitter = new ActionEventEmitter();

export default eventEmitter;
