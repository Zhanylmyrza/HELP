import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register/Profile.css"
import { signup } from "../../actions/auth";
import { connect } from "react-redux";

const RegistrationForm = ({isAuthenticated,signup}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
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
    const {full_name, email, password, re_password} = formData
    
    try {
      signup(full_name, email, password, re_password);
      
      navigate(`/emailconfirm`);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div className="profile-container">
      <form  onSubmit={handleSubmit}>

        <label className="profile-form">
          Email:
          <input
            type="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email "
            required
          />
        </label>

        <label className="profile-form">
        Full Name:
          <input
            type="text"
            name="full_name"
            className="input-field"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full name "
            required
          />
        </label>
        <br />

        <label className="profile-form">
          Password:
          <input
            type="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password "
            required
          />
        </label>
        <br />

        <label className="profile-form">
          Confirm Password:
          <input
            type="password"
            name="re_password"
            className="input-field"
            value={formData.re_password}
            onChange={handleChange}
            placeholder="Confirm Password "
            required
          />
        </label>

        <button type="submit" className="save-button">
          Register
        </button>
      </form>
    </div>
  );
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(RegistrationForm);

