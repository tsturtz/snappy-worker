import { CommandHandler } from "../VkBot";

const start: CommandHandler = (ctx) => {
  try {
    ctx.reply("✅", {
      inline: false,
      one_time: false,
      buttons: [
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "Изменить название",
            },
            color: "positive",
          },
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "3"}',
              label: "Курс доллара",
            },
            color: "secondary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "4"}',
              label: "Какой сегодня день",
            },
            color: "secondary",
          },
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "5"}',
              label: "Цитатка",
            },
            color: "secondary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "6"}',
              label: "Новость",
            },
            color: "secondary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "7"}',
              label: "Caйтик ботяры",
            },
            color: "secondary",
          },
        ],
      ],
    });
  } catch (error) {}
};

export default start;
