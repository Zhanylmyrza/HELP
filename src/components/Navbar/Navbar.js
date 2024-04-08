
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import tipa_logo from "../../images/tipa_logo.png";
import { CiBookmark } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";
import { TbMessages } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { TbDeviceTabletSearch } from "react-icons/tb";
import { useSelector } from "react-redux";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={tipa_logo} alt="logo" />
      </Link>
      <nav>
        <ul className="main-nav-list">
          <li>
            <IoHomeOutline />
            <Link to="/">Home</Link>
          </li>
          <li>
            <TbDeviceTabletSearch />
            <Link to="/about">About</Link>
          </li>
          <li>
            <FaUserTie />
            <Link to="/mentors">Mentors</Link>
          </li>
          <li>
            <PiUsersThree />
            <Link to="/mentees">Mentees</Link>
          </li>
          <li>
            <CiBookmark />
            <Link to="/saved">Saved</Link>
          </li>
          <li>
            <TbMessages />
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <>
                <LuUserCircle2 />
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <>
                <LuUserCircle2 />
                <Link to="/login">Login</Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;


