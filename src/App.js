import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Mentors from "./components/Mentors/Mentors";
import Mentees from "./components/Mentees/Mentees";
import Saved from "./components/Saved/Saved";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Register/Profile";
import RegistrationForm from "./components/Register/RegistrationForm";
import ActivationComponent from "./components/Register/ActivationComponent";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/mentors" Component={Mentors} />
          <Route path="/mentees" Component={Mentees} />
          <Route path="/saved" Component={Saved} />
          <Route path="/messages" Component={Messages} />
          <Route path="/profile" Component={Profile} />
          <Route path="/register" Component={RegistrationForm} />
          <Route path="/authorization" Component={ActivationComponent} />
          <Route path="/activate/:uid/:token" Component={ActivationComponent} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
