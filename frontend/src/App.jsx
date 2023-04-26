import { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Bills from "./pages/Bills";
import BillCard from "./components/BillCard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./contexts/AuthProvider";

// npm run dev : to start the frontend

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(null);

  return (
    <ChakraProvider>
      <AuthProvider>
        <>
          <Navbar />
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
            <Route path="/billSection1" element={<BillCard 
              inv = "INV15001" 
              date="12/12/2021"
              a1="7-Eleven Supermarket" a2="Tesla Street 007" a3="Frisco" a4="CA 0000" 
              p1="Tomato Kethup" quant1="20" price1="99" total1="1980"
              p2="Dabur Honey" quant2="20" price2="99" total2="1980" 
              p3="Kissan Fruit Jam" quant3="20" price3="99" total3="1980"
              subtotal="5940"
              discount="500"
              tax="200"
              total="5640"/>} /> 
            <Route path="/billSection2" element={<BillCard 
              inv = "INV15002" 
              date="15/04/2022"
              a1="Phenix Digital Care" a2="Robert Robertson" a3="1234 NW Bobcat Lane" a4="MO 65584-5678" 
              p1="Boat Watch" quant1="10" price1="1599" total1="15990"
              p2="LCD Writing Pad" quant2="10" price2="300" total2="3000" 
              p3="Laptop" quant3="10" price3="75000" total3="750000"
              subtotal="768990"
              discount="10000"
              tax="2000"
              total="759190"/>} />
            <Route path="/billSection3" element={<BillCard 
              inv = "INV15003" 
              date="16/02/2020"
              a1="Louis Vuitton" a2="Iris Watson" a3="Frederick Nebraska" a4="TF 20620" 
              p1="Tshirt" quant1="10" price1="599" total1="5990"
              p2="Jeans" quant2="10" price2="499" total2="4990" 
              p3="Dress" quant3="10" price3="599" total3="5990"
              subtotal="16970"
              discount="300"
              tax="100"
              total="16770"/>} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/bills" element={<Bills />} />
            </Route>
          </Routes>
        </>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
