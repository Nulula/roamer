import React from "react";
import Geolocation from "../components/Geolocation";
import bgImage from "../assets/backgroundImg.jpg";

function NearMe() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
  };

  return (
    <div style={styles}>
      <Geolocation />
    </div>
  );
}

export default NearMe;
