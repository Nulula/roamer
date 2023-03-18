import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import logo from "../assets/Roumer_Logo.png";

// Styles for the Nav component
const styles = {
  navBar: {
    position: "relative",
  },
  navList: {
    marginRight: "0",
    marginLeft: "auto",
  },
};

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
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div style={styles.navBar} className="container-fluid">
        <div>
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ marginRight: "2px", width: "75px" }}
            />
          </NavLink>
        </div>
        <div
          className="container"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentTime}
        </div>
        <ul className="navbar-nav " style={styles.navList}>
          {/* Login page link */}
          <li className="nav-item" style={{ marginRight: "10px" }}>
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
          <li className="nav-item" style={{ marginRight: "10px" }}>
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
          <li className="nav-item" style={{ marginRight: "10px" }}>
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
          <li className="nav-item" style={{ marginRight: "10px" }}>
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
