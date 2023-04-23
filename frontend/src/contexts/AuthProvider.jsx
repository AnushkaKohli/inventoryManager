import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // if (localStorage.getItem("credentials")) {
  //   setIsLoggedIn(localStorage.getItem("credentials"));
  // }
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
