import { useState } from "react";
import { getSettings } from "../api";
import * as styles from "./LoginForm.module.scss";

interface LoginFromProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

export function LoginForm(props: LoginFromProps) {
  const { onLogin } = props;
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (idInstance.trim() === "" || apiTokenInstance.trim() === "") {
      setErrorMessage("Пожалуйста, введите idInstance и apiTokenInstance."); // Устанавливаем сообщение об ошибке
      return;
    }
    setErrorMessage(null);
    setIsLoading(true); // Начинаем загрузку
    try {
      //  Вызываем API для проверки учетных данных
      await getSettings(idInstance, apiTokenInstance); //  Проверяем учетные данные
      localStorage.setItem("idInstance", idInstance);
      localStorage.setItem("apiTokenInstance", apiTokenInstance);
      setErrorMessage("Учетные данные сохранены!");
      onLogin(idInstance, apiTokenInstance);
    } catch (error) {
      console.error("Ошибка проверки учетных данных:", error);
      setErrorMessage(
        "Неверные учетные данные. Пожалуйста, проверьте idInstance и apiTokenInstance."
      );
    } finally {
      setIsLoading(false); //  Заканчиваем загрузку
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Введите учетные данные GREEN API</h2>
      {errorMessage && (
        <div className={styles["error-message"]}>{errorMessage}</div> // Отображаем сообщение об ошибке, если оно есть
      )}
      <div>
        <label htmlFor="idInstance">idInstance:</label>
        <input
          type="text"
          id="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apiTokenInstance">apiTokenInstance:</label>
        <input
          type="text"
          id="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Войти"}
      </button>
    </form>
  );
}
