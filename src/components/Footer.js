import React from "react";

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

function Footer() {
  return (
    <footer style={styles.footer} className="footer">
      <span style={styles.text}>Copyright © Roumer 2023</span>
    </footer>
  );
}

export default Footer;
