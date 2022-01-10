import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../redux/action";
import "../App.css";

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
    isLoggedIn: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.changeSession);

  useEffect(() => {
    if (state) {
      if (state.isLoggedIn) {
        history.push('/home')
      }
    } else {
    }
  }, [state,history]);

  const [error, setError] = useState("");
  // This function is used to get the input values onChange
  const handleChange = (e) => {
    setError("");
    e.preventDefault();
    const newData = { ...formDetails };
    newData[e.target.name] = e.target.value;
    setFormDetails(newData);
  };
  // This function is used to change the redux state
  const changeLoginStatus = () => {
    dispatch(login());
  };
  // This function is used to check the authentication
  const handleSubmit = () => {
    setError("");
    if (
      state?.username === formDetails.username &&
      state?.password === formDetails.password
    ) {
      setFormDetails({
        username: "",
        password: "",
        isLoggedIn: false,
      });
      localStorage.setItem("loginDetails",JSON.stringify({...state,isLoggedIn:true}))
      history.push("/home");
      changeLoginStatus();
      
    } else {
      setFormDetails({
        username: "",
        password: "",
        isLoggedIn: false,
      });
      setError("Username and password are not matched");
    }
  };
  return (
    <div className="p-20">
      <h1>Login Page</h1>
      <div className="d-flex">
        <div className="loggedin-text">Username : </div>
        <input
          type="text"
          className="input-tag"
          name="username"
          required
          value={formDetails.username}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex">
        <div className="loggedin-text">Password : </div>
        <input
          type="password"
          className="input-tag"
          name="password"
          required
          value={formDetails.password}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="login-btn" onClick={handleSubmit}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
