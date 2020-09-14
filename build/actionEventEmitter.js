"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class ActionEventEmitter extends events_1.EventEmitter {
    listen(event, listener) {
        this.on(event, listener);
    }
    dispatch(event, data) {
        this.emit(event, data);
    }
}
const eventEmitter = new ActionEventEmitter();
exports.default = eventEmitter;
