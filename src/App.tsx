import React, { useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";

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

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {<p>`idInstance:{idInstance}`</p>}
      {<p>`apiTokenInstance:{apiTokenInstance}`</p>}
      {<p>`isLoggedIn:{isLoggedIn}`</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default App;
