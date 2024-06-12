import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
import Login from "./Component/Login";
import Register from "./Component/Register";
import ForgotPassword from "./Component/ForgotPasword";
// import Body from "./Body";
// import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    );
    }
  }

export default App;
