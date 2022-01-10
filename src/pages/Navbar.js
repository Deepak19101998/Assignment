import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector(state => state.changeSession)
  return (
    <>
      {state?.isLoggedIn ? (
        <div className="navbar-outer-div">
          <div className="w-10">
            <NavLink
              to="/home"
              className='logo-btn'
            >
              LOGO
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/home" className='nav-btn'>
              Home
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/task" className='nav-btn'>
              Tasks
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/user" className='nav-btn'>
              User
            </NavLink>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
