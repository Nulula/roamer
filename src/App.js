import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import WrapperForSearch from "./components/WrapperForSearch";

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <WrapperForSearch />
        <Routes>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
