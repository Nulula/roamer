// This code imports necessary components and sets up routing for the app
import React, { useState } from "react"; // Importing the React library

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing routing components from react-router-dom
import Nav from "./components/Nav"; // Importing the Navigation component
import Footer from "./components/Footer"; // Importing the Footer component
import Contact from "./pages/Contact"; // Importing the Contact page component
import Profile from "./pages/Profile/Profile";
import WrapperForSearch from "./components/WrapperForSearch"; // Importing the WrapperForSearch component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Nav /> {/* Rendering the Navigation component*/}
        <Routes>
          <Route path="/" element={<WrapperForSearch />}>
            {" "}
          </Route>{" "}
          {/*Defining */}
          <Route path="/contact" element={<Contact />}></Route>{" "}
          {/*Defining the
          route for the Contact page component*/}
          <Route path="/profile" element={<Profile />}></Route>{" "}
          {/*Defining the
          route for the Profile page component*/}
          <Route path="/nearme" element={<WrapperForSearch />}></Route>{" "}
          {/*
          Defining the route for the WrapperForSearch component*/}
          <Route path="/home" element={<WrapperForSearch />}></Route>{" "}
          {/* Defining the
          route for the Login page component*/}
        </Routes>
        <Footer /> {/* Rendering the Footer component*/}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App; // Exporting the App component as the default export
