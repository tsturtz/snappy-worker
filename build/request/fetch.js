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
exports.RequestError = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class RequestError {
    constructor() {
        this.requestError = true;
        this.message = "Что-то не так, попробуй еще раз 🤯";
    }
}
exports.RequestError = RequestError;
const fetch = (url, method = "GET", data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestOptions = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        };
        return yield node_fetch_1.default(url, requestOptions);
    }
    catch (error) {
        console.error("Request error:", error);
        throw new RequestError();
    }
});
exports.default = fetch;
