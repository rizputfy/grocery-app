import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
// import Body from "./Body";
// import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HeroSection />
        {/* <Body />
        <Footer /> */}
      </div>
    );
    }
  }

export default App;
