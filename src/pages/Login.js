import { useState } from "react";
import { useLocalStorage } from "../components/LocalStorage";

function Login() {
  // Retrieve the user data from local storage
  const [userData, setUserData] = useLocalStorage("userData", {});

  // Set up the form data as state
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  // Handle the form submit
  function handleSubmit(event) {
    event.preventDefault();
    // Save the form data to local storage
    setUserData(formData);
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

  return (
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
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Repeat Password:
        <input
          type="text"
          name="repeatPassword"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default Login;
