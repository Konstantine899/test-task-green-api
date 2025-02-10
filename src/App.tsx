import React from "react";
import { AuthProvider, useAuth } from "./ContextAPI/AuthContext";
import Auth from "./Auth/Auth";
import ChatInterface from "./ChatInterface/ChatInterface";

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
