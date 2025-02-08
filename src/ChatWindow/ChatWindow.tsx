import React, { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

export interface IChatMessageItem {
  text: string;
  isMyMessage: boolean;
}

interface ChatWindowProps {
  messages: IChatMessageItem[];
}

const ChatWindow = (props: ChatWindowProps) => {
  const { messages } = props;
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Автоматическая прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isMyMessage={message.isMyMessage}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
