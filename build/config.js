"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VK_API_VERSION = exports.VK_API_ENDPOINT = exports.CONFIRMATION = exports.ACCESS_TOKEN = exports.PORT = void 0;
exports.PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
exports.ACCESS_TOKEN = (_b = process.env.ACCESS_TOKEN) !== null && _b !== void 0 ? _b : '';
exports.CONFIRMATION = (_c = process.env.CONFIRMATION) !== null && _c !== void 0 ? _c : '';
exports.VK_API_ENDPOINT = "https://api.vk.com/method/";
exports.VK_API_VERSION = "5.124";
