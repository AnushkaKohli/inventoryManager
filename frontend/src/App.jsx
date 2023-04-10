import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <Dashboard />
      {/* <SignUp/> */}
    </>
  );
}

export default App;
