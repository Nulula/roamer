import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./LocalStorage";
import { useSessionStorage } from "./SessionStorage";
import Login from "./Login";

// Define the styles for the profile page
const styles = {
  fontStyle: "italic",
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
  }, [localData, setLocalData]);

  // Update session storage when session data changes
  useEffect(() => {
    setSessionData(sessionData);
  }, [sessionData, setSessionData]);

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
  // removing li item from local storage
  function handleRemove(event) {
    const placeName = event.target.dataset.name;
    console.log(placeName);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("place-")) {
        const place = JSON.parse(localStorage.getItem(key));
        if (place.properties.address_line1 === placeName) {
          localStorage.removeItem(key);
          // Updateing the savedPlaces state to reflect the removal
          setSavedPlaces(
            savedPlaces.filter((p) => p.properties.address_line1 !== placeName)
          );
          break;
        }
      }
    }
  }

  const [uploadedImages, setUploadedImages] = useState(
    JSON.parse(localStorage.getItem("images")) || []
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file, (dataUrl) => {
      const newImages = [...uploadedImages, dataUrl];
      localStorage.setItem("images", JSON.stringify(newImages));
      setUploadedImages(newImages);
    });
  };

  function fileToDataUrl(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  function removeFile(index) {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    localStorage.setItem("images", JSON.stringify(newImages));
    setUploadedImages(newImages);
  }

  return (
    <>
      {sessionData.signedIn ? (
        // Show the profile page if the user is signed in
        <div className="profile-container container mt-5" style={styles}>
          <div className="profile-text text-center mb-5">
            <p>
              Welcome to your profile page, {sessionData.name}! Here, you can
              find all the places you saved during your previous trips.
            </p>
            <button
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div>
            {uploadedImages.slice(0, 5).map((image, index) => (
              <div key={index}>
                <img src={image} alt={`uploaded ${index}`} />
                <button className="button" onClick={() => removeFile(index)}>
                  Remove File
                </button>
              </div>
            ))}
            {uploadedImages.length < 5 && (
              <input
                className="button"
                type="file"
                onChange={handleImageUpload}
              />
            )}
          </div>
          <div className="saved-container">
            <ul>
              {savedPlaces.map((place, index) => (
                <li className="saved-place" key={index}>
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
                  <br></br>
                  <button
                    className="btn btn-primary"
                    data-name={place.properties.address_line1}
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
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
