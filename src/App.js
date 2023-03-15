import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WrapperForSearch from "./components/WrapperForSearch";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <WrapperForSearch />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
