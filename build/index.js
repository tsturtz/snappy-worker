"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const actionEventEmitter_1 = __importDefault(require("./actionEventEmitter"));
const parseAction_1 = __importDefault(require("./parseAction"));
const server = express_1.default();
server.use(express_1.default.json());
server.post("/", (req, res) => {
    const { type, object } = req.body;
    if (type === "confirmation") {
        return res.send(config_1.CONFIRMATION);
    }
    if (type === "message_new") {
        actionEventEmitter_1.default.dispatch(parseAction_1.default(object.message.text), object.message);
    }
    return res.send("ok");
});
const onServerStarted = () => {
    console.log(`Server started on port ${config_1.PORT}`);
};
server.listen(config_1.PORT, onServerStarted);
