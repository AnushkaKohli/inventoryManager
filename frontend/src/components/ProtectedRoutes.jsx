import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { LoginContext } from "../Contexts/LoginContext";

function ProtectedRoutes({ isAuth }) {
  //   const { isLoggedIn, userName } = useContext(LoginContext);
  // const isAuthed = false;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
