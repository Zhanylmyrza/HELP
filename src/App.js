import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Mentors from "./components/Mentors/Mentors";
import Mentees from "./components/Mentees/Mentees";
import Saved from "./screens/Saved/Saved";
import Messages from "./components/Messages/Messages";
import RegistrationForm from "./components/Register/RegistrationForm";
import ActivationComponent from "./components/Register/ActivationComponent";
import Emailconfirm from "./components/Register/Emailconfirm";
import Login from "./components/Register/Login";
import { Provider } from "react-redux";
import store from "./store";
import EditProfile from "./screens/EditProfile/EditProfile";
import Profile from "./screens/Profile/Profile";
import Chat from "./screens/Chat/Chat";
import { LOGIN_SUCCESS, USER_LOADED_SUCCESS } from "./actions/types";
import { isEmpty } from "./utils/isEmpty";

function App() {
  if(!isEmpty(localStorage.getItem('access'))){
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: {access: localStorage.getItem('access')},
    });
  }

  if(!isEmpty(localStorage.getItem('user'))){
    const user = JSON.parse(localStorage.getItem("user"));
    store.dispatch({
      type: USER_LOADED_SUCCESS,
      payload: user,
    });
  }

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
          <Route path="/messages" Component={Chat} />
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
