import React from "react";
import { useLocalStorage } from "../components/LocalStorage";
import Login from "./Login";
import bgImage from "../assets/backgroundImg.jpg";

function Profile() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
    display: "flex",
    fontStyle: "italic",
  };
  const buttonStyle = {
    height: "50px",
  };
  const [userData, setUserData] = useLocalStorage("userData", {});

  function handleLogout() {
    clearLocalStorage();
    setUserData((prevUserData) => ({
      ...prevUserData,
      signedIn: false,
    }));
  }

  function clearLocalStorage() {
    localStorage.removeItem("userData");
  }

  return (
    <>
      {userData.signedIn ? (
        <h5 style={styles}>
          <div className="container mt-5">
            Welcome to your profile page, {userData.name}! Here, you can find
            all the places you saved during your previous trips.
          </div>
          <button
            style={buttonStyle}
            className="botton mt-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </h5>
      ) : (
        <Login setUserData={setUserData} />
      )}
    </>
  );
}

export default Profile;
