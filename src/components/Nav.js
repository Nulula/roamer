import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import logo from "../assets/Roamer_Logo.png";

// Navigation component that displays links to different pages
function Nav() {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm a")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm a"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar navbar-light bg-secondary">
      <div className="container-fluid">
        <div className="logo-date-container">
          <div>
            <NavLink to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ marginRight: "2px", width: "75px" }}
              />
            </NavLink>
          </div>
          <div className="container">
            {currentTime}
          </div>
        </div>
        <ul className="navbar-nav ">
          {/* Login page link */}
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>

          {/* Near me page link */}
          <li className="nav-item">
            <NavLink
              to="/nearme"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Near me
            </NavLink>
          </li>
          {/* Contact us page link */}
          <li className="nav-item">
            <NavLink
              to="/contact"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact us
            </NavLink>
          </li>
          {/* Profile page link */}
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          </li>
          {/* Login page link */}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
