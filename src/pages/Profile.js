import React from "react"; // Importing the React library
import { useLocalStorage } from "../components/LocalStorage"; // Importing the useLocalStorage hook from the LocalStorage component
import Login from "./Login";

function Profile() {
  const [userData, setUserData] = useLocalStorage("userData", {}); // Using the useLocalStorage hook to store and retrieve data
  return <Login />;
}
export default Profile; // Exporting the Profile component as the default export
