import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import "./Login.css"
import { getPersonList } from "../../actions/memberAction";

const Login = ({ login, getPersonList, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    getPersonList()
  },[])

  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.type]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="log-container">
      <h1>Log In</h1>
      <p>Log into your Account</p>
      <br/>
      <form onSubmit={(e) => onSubmit(e)}>
        <span className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </span>
        <br/>

        <span className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </span>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <br/>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>

      
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, getPersonList })(Login);
