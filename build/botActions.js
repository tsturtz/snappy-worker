"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actionEventEmitter_1 = __importDefault(require("./actionEventEmitter"));
const currencyRequest_1 = __importDefault(require("./request/currencyRequest"));
const fetch_1 = require("./request/fetch");
const whatDayTodayRequest_1 = __importDefault(require("./request/whatDayTodayRequest"));
const vkApi_1 = require("./vkApi");
actionEventEmitter_1.default.listen("какой сегодня день", (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayToday = yield whatDayTodayRequest_1.default();
        vkApi_1.sendMessage(message.peer_id, `✅ ${dayToday}`);
    }
    catch (error) {
        if (error instanceof fetch_1.RequestError) {
            vkApi_1.sendMessage(message.peer_id, error.message);
        }
    }
}));
actionEventEmitter_1.default.listen("изменить название", (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayToday = yield whatDayTodayRequest_1.default();
        vkApi_1.editChat(message.peer_id - 2000000000, dayToday);
    }
    catch (error) {
        if (error instanceof fetch_1.RequestError) {
            vkApi_1.sendMessage(message.peer_id, error.message);
        }
    }
}));
const currencyHandler = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usd, eur } = yield currencyRequest_1.default();
        const text = [
            `💵 Доллар: ${usd.value.toFixed(1)}`,
            `💶 Евро: ${eur.value.toFixed(1)}`,
        ].join("\n");
        vkApi_1.sendMessage(message.peer_id, text);
    }
    catch (error) {
        if (error instanceof fetch_1.RequestError) {
            vkApi_1.sendMessage(message.peer_id, error.message);
        }
    }
});
actionEventEmitter_1.default.listen("курс доллара", currencyHandler);
actionEventEmitter_1.default.listen("курс евро", currencyHandler);
