import React from "react";
import { AuthProvider } from "./ContextAPI/AuthContext";
import Auth from "./Auth/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
};

export default App;
