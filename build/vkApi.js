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
exports.editChat = exports.sendMessage = exports.vkApiRequest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("./config");
exports.vkApiRequest = (method, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = new URLSearchParams();
        params.append("access_token", config_1.ACCESS_TOKEN);
        params.append("v", config_1.VK_API_VERSION);
        params.append("random_id", Math.round(Math.random() * 10000000).toString());
        for (let key in data) {
            params.append(key, data[key]);
        }
        node_fetch_1.default(`${config_1.VK_API_ENDPOINT}${method}?${params.toString()}`);
    }
    catch (error) {
        throw error;
    }
});
exports.sendMessage = (peer_id, message) => {
    exports.vkApiRequest("messages.send", { peer_id, message });
};
exports.editChat = (chat_id, title) => {
    exports.vkApiRequest("messages.editChat", { chat_id, title });
};
