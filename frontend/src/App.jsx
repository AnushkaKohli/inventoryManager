import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Table from "./components/Table";

// npm run dev : to start the frontend

function App() {
  return (
    <>
      <Navbar />
      <Login />
      <Dashboard />
      <Table />
      <SignUp />
    </>
  );
}

export default App;
