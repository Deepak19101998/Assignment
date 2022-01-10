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
              style={{ fontSize:"22px", textDecoration: "none" }}
            >
              LOGO
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/home" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/task" style={{ textDecoration: "none" }}>
              Tasks
            </NavLink>
          </div>
          <div className="w-10">
            <NavLink to="/user" style={{ textDecoration: "none" }}>
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
