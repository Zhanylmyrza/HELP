import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Mentors from "./components/Mentors/Mentors";
import Mentees from "./components/Mentees/Mentees";
import Saved from "./components/Saved/Saved";
import Messages from "./components/Messages/Messages";
import {Profile} from "./screens/Profile";
import RegistrationForm from "./components/Register/RegistrationForm";
import ActivationComponent from "./components/Register/ActivationComponent";
import Emailconfirm from "./components/Register/Emailconfirm";
import Login from "./components/Register/Login";
import { Provider } from "react-redux";
import store from "./store";
import EditProfile from "./screens/EditProfile/EditProfile";


function App() {
  return (
    <Provider store={store}>
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
          <Route path="/edit-profile" Component={EditProfile} />
          <Route path="/register" Component={RegistrationForm} />
          <Route path="/activate/:uid/:token" Component={ActivationComponent} />
          <Route path="/emailconfirm" Component={Emailconfirm} />
          <Route path="/login" Component={Login} />

        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
