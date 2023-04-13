import { useState } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Bills from "./pages/Bills";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  // const [isLoggedIn, setisLoggedIn] = useState(null);

  return (
    <ChakraProvider>
      <>
        <Navbar isAuth={isAuth} />
        {/* {isLoggedIn ? (
        <button className="border-2 p-2 m-4 flex " onClick={logOut}>
          Logout
        </button>
      ) : (
        <button className="border-2 p-2 m-4 flex " onClick={logIn}>
          Login
        </button>
      )} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes isAuth={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/bills" element={<Bills />} />
          </Route>
        </Routes>
      </>
    </ChakraProvider>
  );
}

export default App;
