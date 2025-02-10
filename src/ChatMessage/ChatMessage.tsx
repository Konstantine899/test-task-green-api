import React from "react";
import * as styles from "./ChatMessage.module.scss";

interface IChatMessage {
  message: string;
  isMyMessage: boolean;
}

const ChatMessage: React.FC<IChatMessage> = (props) => {
  const { message, isMyMessage } = props;
  const messageClass = isMyMessage ? styles.myMessage : styles.otherMessage;
  return (
    <div className={`${styles.chatMessage} ${messageClass}`}>{message}</div>
  );
};

export default ChatMessage;
