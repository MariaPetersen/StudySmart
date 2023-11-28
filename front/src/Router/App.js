import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup/signup";
import Login from "../Pages/Login/login";
<<<<<<< HEAD
import Publication from "../Pages/Publication/publication";
=======
import Profile from "../Pages/Profile/Profile";
>>>>>>> 7be51b221d0e32b900a88708299e86d62118bd1e
import Nav from "../Components/Nav/nav";
import Footer from "../Components/Footer/footer";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path="/publication" element={<Publication/>} />
=======
        <Route path="/profile" element={<Profile />} />
>>>>>>> 7be51b221d0e32b900a88708299e86d62118bd1e
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
