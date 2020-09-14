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
const fetch_1 = __importDefault(require("./fetch"));
let lastRequestDate = 0;
let cachedCurrency;
const currencyRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date().getDate();
        if (lastRequestDate !== currentDate) {
            lastRequestDate = currentDate;
            const { Valute: { USD, EUR }, } = yield (yield fetch_1.default("https://www.cbr-xml-daily.ru/daily_json.js")).json();
            cachedCurrency = {
                usd: { name: USD.Name, value: USD.Value },
                eur: { name: EUR.Name, value: EUR.Value },
            };
            return cachedCurrency;
        }
        return cachedCurrency;
    }
    catch (error) {
        throw error;
    }
});
exports.default = currencyRequest;
