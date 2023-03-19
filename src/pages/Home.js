import React from "react";
import SearchForm from "../components/SearchForm";
import bgImage from "../assets/backgroundImg.jpg";
import WrapperForSearch from "../components/WrapperForSearch";

function HomePage() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
  };

  return (
    <div style={styles}>
      <WrapperForSearch />
    </div>
  );
}

export default HomePage;
