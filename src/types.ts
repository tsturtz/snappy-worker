import botActions from "./botActions";

export type BotMessage = {
  type: "confirmation" | "message_new";
  object: {
    message: {
      date: number;
      from_id: number;
      id: number;
      out: number;
      peer_id: number;
      text: string;
      conversation_message_id: number;
      fwd_messages: any[];
      important: boolean;
      random_id: number;
      attachments: any[];
      is_hidden: boolean;
    };
    client_info: {};
  };
  group_id: number;
  event_id: string;
};

export type BotAction = typeof botActions[0];

export type RequestError = {
  status?: number;
  message?: string;
};
