import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { BotMessage } from "./types";
import { CONFIRMATION, PORT } from "./config";
import botEvent from "./botEvent";
import parseAction from "./parseAction";
import botActions from "./botActions";
import "./botHandlers";

const server = express();
server.use(morgan("combined"));

server.use(express.json());

server.post("/", (req, res) => {
  const { type, object } = req.body as BotMessage;

  if (type === "confirmation") {
    return res.send(CONFIRMATION);
  }
  if (type === "message_new") {
    const action = botActions.find((action) =>
      parseAction(object.message.text).toLowerCase().includes(action)
    );

    if (action) botEvent.emit(action, object.message);
  }

  console.log(req.body);

  return res.send("ok");
});

const onServerStarted = () => {
  console.log(`Server started on port ${PORT}`);
};

server.listen(PORT, onServerStarted);
