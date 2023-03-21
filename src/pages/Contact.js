import React from "react";
import Feedback from "../components/Feedback";
import bgImage from "../assets/backgroundImg.jpg";

function Contact() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
  };

  return (
    <div style={styles}>
      <div className="feedback">
        <Feedback />
      </div>
    </div>
  );
}

export default Contact;
