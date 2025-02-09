import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSettings } from "../api";

interface AuthContextProps {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
  setIdInstance: (id: string) => void;
  setApiTokenInstance: (token: string) => void;
  setPhoneNumber: (phone: string) => void;
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth необходимо использовать внутри AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [idInstance, setIdInstance] = useState<string>(
    localStorage.getItem("idInstance") || ""
  );
  const [apiTokenInstance, setApiTokenInstance] = useState<string>(
    localStorage.getItem("apiTokenInstance") || ""
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!idInstance && !!apiTokenInstance
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const value: AuthContextProps = {
    idInstance,
    apiTokenInstance,
    phoneNumber,
    setIdInstance,
    setApiTokenInstance,
    setPhoneNumber,
    isLoading,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};
