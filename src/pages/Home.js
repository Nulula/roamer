import React from "react";
import SearchForm from "../components/SearchForm";
import bgImage from "../assets/backgroundImg.jpg";

function HomePage() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
  };

  return (
    <div style={styles}>
      <SearchForm />
    </div>
  );
}

export default HomePage;
