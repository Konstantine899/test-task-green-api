import React, { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import ChatWindow, { IChatMessageItem } from "../ChatWindow/ChatWindow";
import ChatInput from "../ChatInput/ChatInput";
import { logout, sendMessage } from "../api";
import { useAuth } from "../ContextAPI/AuthContext";

const Auth = () => {
  const [messages, setMessages] = useState<IChatMessageItem[]>([]);
  const {
    idInstance,
    apiTokenInstance,
    phoneNumber,
    setPhoneNumber,
    setApiTokenInstance,
    setIdInstance,
    isLoading,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuth();

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
      setIsLoggedIn(true);
      setMessages([]);
      alert("Вы вышли из системы");
    }
  };

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

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h1>Чат WhatsApp</h1>
          <ChatWindow messages={messages} setPhoneNumber={setPhoneNumber} />
          <ChatInput
            onSendMessage={handleSendMessage}
            getPhoneNumber={getPhoneNumber}
          />
          {isLoading && <p>Загрузка...</p>}
          <button onClick={() => handleLogout(idInstance, apiTokenInstance)}>
            Выйти
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
