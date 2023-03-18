import React, { useState } from "react";
import "../components/LoginModal.css";
import { useLocalStorage } from "../components/LocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../assets/backgroundImg.jpg";

function LoginModal() {
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
    display: "flex",
    fontStyle: "italic",
  };
  // Retrieve the user data from local storage
  const [userData, setUserData] = useLocalStorage("userData", {
    name: "",
    password: "",
    repeatPassword: "",
    signedIn: false,
  });

  // Set up the form data as state
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    repeatPassword: "",
  });

  // Handle the form submit
  function handleSubmit(event) {
    event.preventDefault();
    // Save the form data to local storage
    if (formData.password !== formData.repeatPassword) {
      toast.error("Oops! Passwords mismatch!");
      return;
    }
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...formData,
      signedIn: true,
    }));
    setShowModal(false); // Hide the modal
  }

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    // Update the form data with the new value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const [showModal, setShowModal] = useState(!userData.signedIn);

  function handleSkip() {
    setUserData((prevUserData) => ({
      ...prevUserData,
      signedIn: false,
    }));
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <ul style={{ listStyle: "none" }}>
                <h3>Sign in:</h3>
                <li>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="repeat password"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <button type="submit">Save</button>
                </li>
                <li>
                  <button onClick={handleSkip}>Skip</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
      {!showModal && (
        <h5 style={styles}>
          <div className="container mt-5">
            {userData.signedIn ? (
              `Welcome to your profile page, ${userData.name}! On this page, you can find all the places that you've saved during your trips.`
            ) : (
              <span>
                Welcome! To access your profile page, please register and login.
                Registering is quick and easy, and it allows you to take
                advantage of all the features our website has to offer. Once
                you're logged in, you'll be able to view your profile page and
                update your information at any time. Thank you for choosing our
                website!
              </span>
            )}
          </div>
        </h5>
      )}
    </>
  );
}

export default LoginModal;
