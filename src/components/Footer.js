// Importing the React library
import React from "react";

// Defining the styles for the footer and its text
const styles = {
  footer: {
    position: "relative",
    padding: "3px",
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Defining the Footer component
function Footer() {
  // Returning the footer with its text
  return (
    <footer style={styles.footer} className="footer">
      <span style={styles.text}>Copyright © Roamer 2023</span>
    </footer>
  );
}

// Exporting the Footer component as default
export default Footer;
