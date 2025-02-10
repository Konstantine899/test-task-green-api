import React from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { useAuth } from "../ContextAPI/AuthContext";

const Auth = () => {
  const {
    setApiTokenInstance,
    setIdInstance,

    setIsLoggedIn,
  } = useAuth();

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Auth;
