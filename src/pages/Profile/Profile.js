// Import React library, useState and useEffect hooks, and some custom hooks
import React from "react";
import { useSessionStorage } from "./SessionStorage";
import { useLocalStorage } from "./LocalStorage";
import { useEffect } from "react";
import Login from "./Login"; // Import Login component
import bgImage from "./assets/backgroundImg.jpg"; // Import background image

// Define a functional component called Profile
function Profile() {
  // Define some inline styles as an object
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

  // Call useSessionStorage and useLocalStorage custom hooks to get and set data from browser's sessionStorage and localStorage
  const [userData, setUserData] = useSessionStorage("userData", {});
  const [localData, setLocalData] = useLocalStorage("localData", {});

  // Call useEffect hook to set localData when userData changes
  useEffect(() => {
    setLocalData(userData);
  }, []);

  // Define a function to handle logout
  function handleLogout() {
    // Call clearSessionStorage function to remove user data from sessionStorage
    clearSessionStorage();
    // Update userData by setting the signedIn property to false
    setUserData((prevUserData) => ({
      ...prevUserData,
      signedIn: false,
    }));
  }

  // Define a function to remove user data from sessionStorage
  function clearSessionStorage() {
    sessionStorage.removeItem("userData");
  }

  // Render Profile component
  return (
    <>
      {/* Render different content based on whether user is signed in or not */}
      {userData.signedIn ? (
        // If user is signed in, render a welcome message and a logout button
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
        // If user is not signed in, render the Login component
        <Login setUserData={setUserData} />
      )}
    </>
  );
}

// Export Profile component as a default export
export default Profile;
