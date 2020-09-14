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
const getRandomNames = (names) => {
    const randomIndex = Math.floor(Math.random() * Math.floor(names.length));
    return names[randomIndex];
};
let lastRequestDate = 0;
let cachedDaysNames = [];
const whatDayTodayRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date().getDate();
        if (lastRequestDate !== currentDate) {
            lastRequestDate = currentDate;
            const htmlContent = yield (yield fetch_1.default("http://kakoysegodnyaprazdnik.ru/")).text();
            const daysNames = [
                ...htmlContent.matchAll(/<span itemprop="text">(.*?)<\/span>/g),
            ].flatMap((item) => item[1].split(" (")[0]);
            cachedDaysNames = daysNames;
            return getRandomNames(daysNames);
        }
        return getRandomNames(cachedDaysNames);
    }
    catch (error) {
        throw error;
    }
});
exports.default = whatDayTodayRequest;
