import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../Pages/Signup/signup';
import Login from '../Pages/Login/login';
import Nav from '../Components/Nav/nav';
import Footer from '../Components/Footer/footer';
import Home from '../Pages/Home/home';
import { UserContextProvider } from '../Context/Usercontext';
function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
