import React, { useCallback, useState } from "react";

interface IChatInput {
  onSendMessage: (message: string) => void;
}

const ChatInput = (props: IChatInput) => {
  const { onSendMessage } = props;
  const [message, setMessage] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleSendClick = useCallback(() => {
    if (message.trim() !== "") {
      onSendMessage(message.trim());
      setMessage("");
    }
  }, [message, onSendMessage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key == "Enter" && !event.shiftKey && message.trim() !== "") {
        event.preventDefault(); // предотвращаю переход на новую строку
        onSendMessage(message.trim());
        setMessage("");
      }
    },
    [message, onSendMessage]
  );
  return (
    <div className="chat-input">
      <textarea
        placeholder={"Введите сообщение..."}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendClick}>Отправить</button>
    </div>
  );
};

export default ChatInput;
