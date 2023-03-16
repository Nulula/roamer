import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Feedback />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
