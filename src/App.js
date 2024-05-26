import React, { Component } from "react";
import Header from "./Component/Header";
import HeroSection from "./Component/HeroSection";
// import Body from "./Body";
// import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <HeroSection />
        {/* <Body />
        <Footer /> */}
      </div>
    );
    }
  }

export default App;
