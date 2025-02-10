import React, { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

export interface IChatMessageItem {
  text: string;
  isMyMessage: boolean;
}

interface ChatWindowProps {
  messages: IChatMessageItem[];
  setPhoneNumber: (phone: string) => void;
}

const ChatWindow = (props: ChatWindowProps) => {
  const { messages, setPhoneNumber } = props;
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Автоматическая прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="recipient">Номер телефона получателя:</label>
        <input
          type="text"
          id={"recipient"}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isMyMessage={message.isMyMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
