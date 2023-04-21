import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
// import { LoginContext } from "../Contexts/LoginContext";

function ProtectedRoutes() {
  //   const { isLoggedIn, userName } = useContext(LoginContext);
  // const isAuthed = false;
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
