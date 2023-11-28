import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../Context/Usercontext";
import Signup from "../Pages/Signup/signup";
import Home from "../Pages/Home/home"
import Login from "../Pages/Login/login";
import Publication from "../Pages/Publication/publication";
import Profile from "../Pages/Profile/Profile";
import Nav from "../Components/Nav/nav";
import Footer from "../Components/Footer/footer";
function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/publication" element={<Publication/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
      </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
