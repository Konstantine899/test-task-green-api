import React, { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { getSettings, logout } from "./api";

const App = () => {
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
      alert("Вы вышли из системы");
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
