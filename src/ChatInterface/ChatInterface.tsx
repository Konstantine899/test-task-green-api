import React, { useCallback, useEffect, useState } from "react";
import ChatWindow, { IChatMessageItem } from "../ChatWindow/ChatWindow";
import ChatInput from "../ChatInput/ChatInput";
import { deleteNotification, receiveMessage, sendMessage } from "../api";
import { useAuth } from "../ContextAPI/AuthContext";
import * as styles from "./ChatInterface.module.scss";

const ChatInterface = () => {
  const [messages, setMessages] = useState<IChatMessageItem[]>([]);
  const {
    setIdInstance,
    setIsLoggedIn,
    isLoggedIn,
    idInstance,
    apiTokenInstance,
    phoneNumber,
    setPhoneNumber,
    isLoading,
  } = useAuth();

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("idInstance");
    localStorage.removeItem("apiTokenInstance");
    setIdInstance("");
    setIsLoggedIn(false);
    setMessages([]);
    alert("Вы вышли из системы");
  }, []);

  const handleSendMessage = async (message: string, phoneNumber: string) => {
    if (!isLoggedIn || !phoneNumber) {
      alert(`Пожалуйста войдите и введите номер получателя`);
      return;
    }
    try {
      const newMessage: IChatMessageItem = { text: message, isMyMessage: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      await sendMessage(idInstance, apiTokenInstance, phoneNumber, message);
      alert(`Сообщение отправлено!`);
    } catch (error) {
      console.log("Ошибка отправки сообщения", error);
      alert("Ошибка отправки сообщения");
    }
  };

  const getPhoneNumber = () => {
    return phoneNumber;
  };

  const fetchNewMessages = useCallback(async () => {
    if (isLoggedIn && idInstance && apiTokenInstance) {
      try {
        const newMessage = await receiveMessage(idInstance, apiTokenInstance);

        if (newMessage) {
          try {
            // Проверяем наличие body, senderData и sender
            const senderPhoneNumber =
              newMessage.body?.senderData?.sender?.split("@")[0] || "";
            const text =
              newMessage.body?.messageData?.textMessageData?.textMessage || "";
            const isMyMessage = phoneNumber === senderPhoneNumber;

            if (text) {
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: text, isMyMessage },
              ]);
            }

            if (newMessage.receiptId) {
              try {
                await deleteNotification(
                  idInstance,
                  apiTokenInstance,
                  newMessage.receiptId
                );
              } catch (deleteError) {
                console.error(
                  "fetchNewMessages: Ошибка при удалении уведомления:",
                  deleteError
                );
              }
            } else {
              console.warn(
                "fetchNewMessages: Нет receiptId, пропуск deleteNotification"
              );
            }
          } catch (processingError) {
            console.error(
              "fetchNewMessages: Ошибка при обработке сообщения:",
              processingError
            );
          }
        } else {
          console.warn(
            "fetchNewMessages: Нет нового сообщения (newMessage is null)"
          );
        }
      } catch (receiveError) {
        console.error(
          "fetchNewMessages: Ошибка при получении сообщения:",
          receiveError
        );
      }
    }
  }, [isLoggedIn, idInstance, apiTokenInstance, phoneNumber, setMessages]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | number | undefined;
    if (isLoggedIn) {
      intervalId = setInterval(
        fetchNewMessages,
        RECEIVING_INCOMING_MESSAGE_TIMEOUT__
      );
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoggedIn, fetchNewMessages]);

  return (
    <div className={styles["chatContainer"]}>
      <h1 className={styles["chatTitle"]}>Чат WhatsApp</h1>
      <ChatWindow messages={messages} setPhoneNumber={setPhoneNumber} />
      <ChatInput
        onSendMessage={handleSendMessage}
        getPhoneNumber={getPhoneNumber}
      />
      {isLoading && <p className={styles["loading"]}>Загрузка...</p>}
      <button className={styles["logoutButton"]} onClick={() => handleLogout()}>
        Выйти
      </button>
    </div>
  );
};

export default ChatInterface;
