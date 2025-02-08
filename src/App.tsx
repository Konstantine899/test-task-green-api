import React, { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { getSettings, logout, sendMessage } from "./api";
import ChatWindow, { IChatMessageItem } from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";

const App = () => {
  const [messages, setMessages] = useState<IChatMessageItem[]>([]);
  const [idInstance, setIdInstance] = useState<string>(
    localStorage.getItem("idInstance") || ""
  );
  const [apiTokenInstance, setApiTokenInstance] = useState<string>(
    localStorage.getItem("apiTokenInstance") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!idInstance && !!apiTokenInstance
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const settings = await getSettings(idInstance, apiTokenInstance);
          const wid = settings.wid;
          const phoneNumber = wid.split("@")[0];
          setPhoneNumber(phoneNumber);
          setIsLoading(false);
          alert("Настройки загружены");
        } catch (error) {
          console.error("Ошибка получения настроек:", error);
          setIsLoading(false);
          alert("Ошибка загрузки настроек");
        }
      }
    };
    fetchData();
  }, [isLoggedIn, idInstance, apiTokenInstance]);

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLoggedIn(true);
  };

  const handleLogout = async (idInstance: string, apiTokenInstance: string) => {
    const isLogin = await logout(idInstance, apiTokenInstance);
    if (isLogin) {
      localStorage.removeItem("idInstance");
      localStorage.removeItem("apiTokenInstance");
      setIdInstance("");
      setIsLoggedIn(false);
      setMessages([]);
      alert("Вы вышли из системы");
    }
  };

  const handleSendMessage = async (message: string) => {
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

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h1>Чат WhatsApp</h1>
          <p>Вы общаетесь с номером: {phoneNumber}</p>
          <ChatWindow messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
          {isLoading && <p>Загрузка...</p>}
          <button onClick={() => handleLogout(idInstance, apiTokenInstance)}>
            Выйти
          </button>
        </>
      )}
    </div>
  );
};

export default App;
