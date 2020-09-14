import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { BotMessage } from "./types";
import { CONFIRMATION, PORT } from "./config";
import actionEventEmitter from "./actionEventEmitter";
import parseAction from "./parseAction";
import { actions } from "./botActions";

const server = express();

server.use(express.json());

server.post("/", (req, res) => {
  const { type, object } = req.body as BotMessage;

  if (type === "confirmation") {
    return res.send(CONFIRMATION);
  }
  if (type === "message_new") {
    const action = actions.find((action) =>
      parseAction(object.message.text).toLowerCase().includes(action)
    );

    if (action) actionEventEmitter.dispatch(action, object.message);
  }

  console.log(req.body);

  return res.send("ok");
});

const onServerStarted = () => {
  console.log(`Server started on port ${PORT}`);
};

server.listen(PORT, onServerStarted);
