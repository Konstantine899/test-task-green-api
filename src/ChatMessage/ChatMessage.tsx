import React from "react";

interface IChatMessage {
  message: string;
  isMyMessage: boolean;
}

const ChatMessage = (props: IChatMessage) => {
  const { message, isMyMessage } = props;
  const messageClass = isMyMessage ? "my-message" : "other-message";
  return <div className={`chat-message${messageClass}`}>{message}</div>;
};

export default ChatMessage;
