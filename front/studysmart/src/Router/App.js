import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup/signup";
import Login from "../Pages/Login/login";
import Publication from "../Pages/Publication/publication";
import Nav from "../Components/Nav/nav";
import Footer from "../Components/Footer/footer";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/publication" element={<Publication/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
