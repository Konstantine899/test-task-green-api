import React, { useCallback, useState } from "react";
import * as styles from "./ChatInput.module.scss";

interface IChatInput {
  onSendMessage: (message: string, phoneNumber: string) => void;
  getPhoneNumber: () => string;
}

const ChatInput = (props: IChatInput) => {
  const { onSendMessage, getPhoneNumber } = props;
  const [message, setMessage] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleSendClick = useCallback(() => {
    if (message.trim() !== "") {
      onSendMessage(message.trim(), getPhoneNumber());
      setMessage("");
    }
  }, [message, onSendMessage, getPhoneNumber]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key == "Enter" && !event.shiftKey && message.trim() !== "") {
        event.preventDefault(); // предотвращаю переход на новую строку
        onSendMessage(message.trim(), getPhoneNumber());
        setMessage("");
      }
    },
    [message, onSendMessage, getPhoneNumber]
  );
  return (
    <div className={styles["chatInput"]}>
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
