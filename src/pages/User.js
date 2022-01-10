import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/action";
import "../App.css";

const User = () => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("loginDetails")) || ""
  );

  const state = useSelector(state => state.changeSession)
  const dispatch = useDispatch()
  // This state is used change the user password
  const [newPassword, setNewPassword] = useState("");
  // This state is used manage the data conditionally
  const [show, setShow] = useState(true);
  const history = useHistory()
  
  useEffect(() => {
    if (state) {
      if (!state.isLoggedIn) {
        history.push('/')
      }
    } else {
    }
  }, [state,history]);

  // This function is used changes the redux state of login status
  const changeLogoutStatus = () => {
    dispatch(logout())
  }

  // This function is used to logout
  const handleLogout = (e) => {
    e.preventDefault();
    alert("You have been successfully logout...");
    localStorage.setItem("loginDetails",JSON.stringify({...state,isLoggedIn:false}))
    changeLogoutStatus();
    history.push("/")
  };

  // This function is used to change the password
  const handlePasswordChange = () => {
    setUserDetails({ ...userDetails, password: newPassword });
    localStorage.setItem(
      "loginDetails",
      JSON.stringify({ ...userDetails, password: newPassword })
    );
    alert("Password has been successfully changed...");
    setShow(true)
  };

  return (
    <div className="p-20">
      <div className="d-flex">
        <div className="loggedin-text">Username : </div>
        <div className="m-10">{userDetails.username}</div>
      </div>
      {show ? (
        <div className="d-flex">
          <div className="loggedin-text">Password : </div>
          <div className="m-10">{userDetails.password}</div>
        </div>
      ) : (
        <div className="d-flex">
          <div className="loggedin-text">New Password : </div>
          <div className="m-10">
            <input
              type="password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className='input-tag-user'
            />
          </div>
        </div>
      )}

      <div className="mt-40">
        {show ? (
          <button className="change-btn" onClick={() => setShow(false)}>
            Change Password
          </button>
        ) : (
          <button className="save-btn" onClick={handlePasswordChange}>
            Save Password
          </button>
        )}
        <button className="logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
        {!show ? (
          <button
            className="back-btn"
            type="button"
            onClick={() => setShow(true)}
          >
            Back
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default User;
