import React, { useState } from "react";
import "./LoginModal.css";
import { useSessionStorage } from "./SessionStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This function creates a login modal component
function LoginModal() {
  // Define styles for the login modal
  const styles = {
    margin: "5% 20% ",
    padding: "10px",
    borderRadius: "25px",
    backgroundColor: "rgba(108, 117, 125, 0.9)",
    height: "20%",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  // Use the useLocalStorage hook to store and retrieve user data

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
  const [formType, setFormType] = useState("login");

  // This function is called when the user submits the form
  async function handleSubmit(event) {
    event.preventDefault();

    // Validate that all form fields are filled in
    if (!formData.name || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if the user exists in the local storage if logging in
    if (formType === "login") {
      const localStorageData = JSON.parse(localStorage.getItem("userData"));
      if (
        localStorageData &&
        localStorageData.name === formData.name &&
        localStorageData.password === formData.password
      ) {
        // Update the user data and hide the modal
        setUserData({
          ...userData,
          ...formData,
          signedIn: true,
        });
        setShowModal(false);
        return;
      } else {
        toast.error("Incorrect username or password!");
        return;
      }
    }

    // Check if the user already exists in the local storage if signing up
    if (formType === "signIn") {
      const localStorageData = JSON.parse(localStorage.getItem("userData"));
      if (localStorageData && localStorageData.name === formData.name) {
        toast.error("Username already exists!");
        return;
      }

      // Validate that the passwords match
      if (formData.password !== formData.repeatPassword) {
        toast.error("Oops! Passwords mismatch!");
        return;
      }

      // Save the user data to the local storage and hide the modal
      localStorage.setItem("userData", JSON.stringify(formData));
      setUserData({
        ...userData,
        ...formData,
        signedIn: true,
      });
      setShowModal(false);
    }
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
    localStorage.clear();
    setFormType("signIn");
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <ul style={{ listStyle: "none" }}>
              <form onSubmit={handleSubmit}>
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

                {formType === "signIn" && (
                  <li>
                    <input
                      type="password"
                      name="repeatPassword"
                      placeholder="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                    />
                  </li>
                )}
                <button className="btn btn-success rounded-start" type="submit">
                  {formType === "signIn" ? "Sign In" : "Log In"}
                </button>
              </form>
            </ul>
            <div>
              {formType === "signIn" ? (
                <>
                  <p onClick={handleLoginClick}>
                    Already have an account?
                    <span
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "green",
                      }}
                    >
                      Log In
                    </span>
                  </p>

                  <p
                    onClick={handleSkip}
                    style={{
                      textDecoration: "underline",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "grey",
                    }}
                  >
                    Proceed without registration
                  </p>
                </>
              ) : (
                <div>
                  <p
                    style={{
                      color: "grey",
                    }}
                    onClick={handleRegister}
                  >
                    If you don't have an account, follow the link to{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "green",
                      }}
                    >
                      register
                    </span>
                  </p>
                  <p
                    onClick={handleSkip}
                    style={{
                      textDecoration: "underline",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "grey",
                    }}
                  >
                    Proceed without registration
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!showModal && (
        <div style={styles}>
          <div className="container m-4">
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
                <button
                  className="btn btn-success rounded-start"
                  onClick={handleRegister}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { useState };
export default LoginModal;
