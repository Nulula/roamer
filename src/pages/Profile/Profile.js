import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./LocalStorage";
import { useSessionStorage } from "./SessionStorage";
import Login from "./Login";
import bgImage from "./assets/backgroundImg.jpg";

// Define the styles for the profile page
const styles = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  height: "88vh",
  display: "flex",
  fontStyle: "italic",
};

// Define the styles for the logout button
const buttonStyle = {
  height: "35px",
  borderRadius: "5px",
  background: "green",
  border: "transparent",
  color: "white",
};

// Define the Profile component
function Profile() {
  // Use local storage to store user data
  const [localData, setLocalData] = useLocalStorage("userData", {});

  // Use session storage to store user data
  const [sessionData, setSessionData] = useSessionStorage("userData", {});

  // Update local storage when local data changes
  useEffect(() => {
    setLocalData(localData);
  }, [localData]);

  // Update session storage when session data changes
  useEffect(() => {
    setSessionData(sessionData);
  }, [sessionData]);

  // Save session data to local storage and clear session storage
  function saveLocalStorage() {
    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(sessionData));
    clearSessionStorage();
  }

  // Handle logout by saving session data to local storage and clearing session data
  function handleLogout() {
    saveLocalStorage();
    setSessionData({});
  }

  // Clear session storage
  function clearSessionStorage() {
    sessionStorage.removeItem("userData");
  }

  // places from lovcal storage
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const savedPlaces = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("place-")) {
        const place = JSON.parse(localStorage.getItem(key));
        savedPlaces.push(place);
      }
    }
    setSavedPlaces(savedPlaces);
  }, []);

  return (
    <>
      {sessionData.signedIn ? (
        // Show the profile page if the user is signed in
        <div>
          <div style={styles}>
            <div className="container mt-5">
              Welcome to your profile page, {sessionData.name}! Here, you can
              find all the places you saved during your previous trips.
            </div>

            <button
              style={buttonStyle}
              className="botton mt-5"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div>
            <ul>
              {savedPlaces.map((place, index) => (
                <li key={index}>
                  <h3>{place.properties.address_line1}</h3>
                  <p>{place.properties.address_line2}</p>
                  <p>{place.properties.datasource.raw.phone}</p>
                  <a
                    href={place.properties.datasource.raw.website}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {place.properties.datasource.raw.website}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        // Show the login page if the user is not signed in
        <Login setSessionData={setSessionData} />
      )}
    </>
  );
}

export default Profile;
