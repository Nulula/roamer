import React, { useState } from "react";
import "./LoginModal.css";
import { useSessionStorage } from "./SessionStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "./assets/backgroundImg.jpg";

// This function creates a login modal component
function LoginModal() {
  // Define styles for the login modal
  const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    height: "88vh",
    display: "flex",
    fontStyle: "italic",
  };

  // Use the useSessionStorage hook to store and retrieve user data
  const [userData, setUserData] = useSessionStorage("userData", {
    name: "",
    password: "",
    repeatPassword: "",
    signedIn: false,
  });

  // Use the useState hook to store and retrieve form data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    repeatPassword: "",
  });

  // Use the useState hook to keep track of the current form type (sign in or login)
  const [formType, setFormType] = useState("signIn");

  // This function is called when the user submits the form
  function handleSubmit(event) {
    event.preventDefault();

    // Validate that all form fields are filled in
    if (!formData.name || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate that the passwords match if signing up
    if (
      formType === "signIn" &&
      formData.password !== formData.repeatPassword
    ) {
      toast.error("Oops! Passwords mismatch!");
      return;
    }

    // Check if the user exists in the local storage if logging in
    const localStorageData = JSON.parse(localStorage.getItem("localData"));
    if (
      formType === "login" &&
      (!localStorageData ||
        localStorageData.password !== formData.password ||
        localStorageData.name !== formData.name)
    ) {
      toast.error("Incorrect username or password!");
      return;
    }

    // Update the user data and hide the modal
    setUserData({
      ...userData,
      ...formData,
      signedIn: true,
    });
    setShowModal(false);
  }

  // This function is called when a form field changes
  function handleChange(event) {
    const { name, value } = event.target;

    // Update the form data with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Use the useState hook to keep track of whether to show the modal or not
  const [showModal, setShowModal] = useState(!userData.signedIn);

  // This function is called when the user clicks the login button
  function handleLoginClick() {
    // Change the form type to "login" and show the modal
    setFormType("login");
    setShowModal(true);
  }

  // This function is called when the user clicks the skip button
  function handleSkip() {
    // Update the user data and hide the modal
    setUserData({
      ...userData,
      signedIn: false,
    });
    setShowModal(false);
  }

  // This function is called when the user clicks the register button
  function handleRegister() {
    // Change the form type to "signIn" and show the modal
    setFormType("signIn");
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <div className="login-modal" style={styles}>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {formType === "signIn" && (
              <label>
                Repeat Password:
                <input
                  type="password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
              </label>
            )}
            <button type="submit">
              {formType === "signIn" ? "Sign In" : "Log In"}
            </button>
          </form>
          <div className="login-modal-buttons">
            {formType === "signIn" ? (
              <>
                <button onClick={handleLoginClick}>Log In</button>
                <button onClick={handleSkip}>Skip Login</button>
              </>
            ) : (
              <button onClick={handleRegister}>Sign In</button>
            )}
          </div>
        </div>
      )}
      {!showModal && (
        <h5 style={styles}>
          <div className="container mt-5">
            {userData.signedIn ? (
              window.location.replace("/profile") // Redirect to the profile page
            ) : (
              <>
                <span>
                  Welcome! To access your profile page, please register and
                  login. Registering is quick and easy, and it allows you to
                  take advantage of all the features our website has to offer.
                  Once you're logged in, you'll be able to view your profile
                  page and update your information at any time. Thank you for
                  choosing our website!
                </span>
                <button onClick={handleRegister}>Sign In</button>
              </>
            )}
          </div>
        </h5>
      )}
    </>
  );
}

export { useState };
export default LoginModal;