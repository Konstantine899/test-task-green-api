import React from "react";
import { AuthProvider, useAuth } from "./ContextAPI/AuthContext";
import Auth from "./Auth/Auth";
import ChatInterface from "./ChatInterface/ChatInterface";
import "./App.module.scss";

const App = () => {
  const { isLoggedIn } = useAuth();

  return <>{!isLoggedIn ? <Auth /> : <ChatInterface />}</>;
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
