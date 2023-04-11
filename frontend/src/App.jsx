import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Table from "./components/Table";

function App() {
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <Dashboard />
      <Table />
      {/* <SignUp/> */}
    </>
  );
}

export default App;
