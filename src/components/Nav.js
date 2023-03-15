import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Roumer_Logo.png";

const styles = {
  navBar: {
    position: "relative",
  },
  navList: {
    marginRight: "0",
    marginLeft: "auto",
  },
};

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div style={styles.navBar} className="container-fluid">
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{ marginRight: "2px", width: "75px" }}
          />
        </div>
        <ul className="navbar-nav " style={styles.navList}>
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
          <li className="nav-item" style={{ marginRight: "10px" }}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
