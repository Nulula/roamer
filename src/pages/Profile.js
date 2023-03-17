import React from "react"; // Importing the React library
import { useLocalStorage } from "../components/LocalStorage"; // Importing the useLocalStorage hook from the LocalStorage component

function Profile() {
  const [userData, setUserData] = useLocalStorage("userData", {}); // Using the useLocalStorage hook to store and retrieve data

  return (
    <div className="container h-100">
      <h1>{userData.name}'s Profile</h1>{" "}
      {/* Rendering the user's name in the
      profile*/}
      <ul>
        <li>Country: {userData.country}</li>{" "}
        {/* Rendering the user's country in
        the profile*/}
        <li>City: {userData.city}</li>{" "}
        {/* Rendering the user's city in the
        profile*/}
        <li>Place: {userData.place}</li>{" "}
        {/* Rendering the user's favorite place
        in the profile*/}
        <li>Entertainment: {userData.place}</li>{" "}
        {/* Rendering the user's
        favorite entertainment in the profile*/}
      </ul>
    </div>
  );
}

export default Profile; // Exporting the Profile component as the default export
