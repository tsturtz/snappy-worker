"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAction = (message) => {
    return message
        .toLowerCase()
        .replace(/\[(.*?)\]/g, "")
        .trim();
};
exports.default = parseAction;
