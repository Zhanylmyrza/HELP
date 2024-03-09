import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "../About/About";

import turasy_1 from "../../images/turasy_1.png";
import after_reg from "../../images/after_reg.png";
import "./Home.css";
import { connect } from "react-redux";

const Home = ({isAuthenticated}) => {
  const handleSignUp = () => {
    // Logic for handling sign-up, e.g., redirecting to a sign-up page
    console.log("Sign up logic here");

  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="centered-image">
            <img src={after_reg} alt="img" />
          </div>
          <Link to="/mentors">
            <button className="findMentors">Find mentors</button>
          </Link>
        </div>
      ) : (
        <div className="centered-container">
          <div className="centered-image">
            <img src={turasy_1} alt="img" />
          </div>
          <Link to="/register">
            <button className="signUp" onClick={handleSignUp}>
              Sign Up Free
            </button>
          </Link>
          <About />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
