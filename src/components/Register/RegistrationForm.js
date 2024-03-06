import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.re_password) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        formData
      );
      console.log("User registration successful:", response.data);
      const {} = response.data;
      console.log(JSON.stringify(response.data, null, 2));
      // Redirect to the authorization page
      console.log(response.data)
      
      const token = localStorage.setItem("access", );
      console.log("token", token);
      navigate(`/authorization/qqqq/${token}`);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Confirm Password:
        <input
          type="password"
          name="re_password"
          value={formData.re_password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
