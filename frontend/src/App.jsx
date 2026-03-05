import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CoinPage from "./pages/CoinPage";
import Subscribe from "./pages/Subscribe";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Markets from "./pages/Markets";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coin/:symbol" element={<CoinPage />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
<Route path="/markets" element={<Markets/>} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;
