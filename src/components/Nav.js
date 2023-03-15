import React from "react";
import { NavLink } from "react-router-dom";

const styles = {
  navBar: {
    position: "relative",
  },
};

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ml-80">
      <div style={styles.navBar}>
        <ul className="navbar-nav ">
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
          <li className="nav-item">
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
