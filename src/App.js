import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Map from "./components/Map";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
