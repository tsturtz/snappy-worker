require("dotenv").config();

const express = require("express");

const port = process.env.PORT;

const app = express();
// const bot = new VkBot({
//   token: process.env.TOKEN,
//   confirmation: process.env.CONFIRMATION,
// });

// bot.on((ctx) => {
//   ctx.reply('Hello!');
//   console.log('Call!');
// });

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
