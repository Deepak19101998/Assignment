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
  const [showIcon, setShowIcon] = useState(true);
  const userDetails = JSON.parse(localStorage.getItem("loginDetails")) || "";
  const state = useSelector((state) => state.changeSession);

  useEffect(() => {
    if (state) {
      if (state.isLoggedIn) {
        history.push('/home')
      }
    } else {
    }
  }, [state]);

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
      userDetails?.username === formDetails.username &&
      userDetails?.password === formDetails.password
    ) {
      setFormDetails({
        username: "",
        password: "",
        isLoggedIn: false,
      });
      localStorage.setItem("loginDetails",JSON.stringify({...userDetails,isLoggedIn:true}))
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
          style={{paddingRight:'40px'}}
        />
      </div>
      <div className="d-flex">
        <div className="loggedin-text">Password : </div>
        <div style={{position:'relative'}}>
        <input
          type={showIcon ? "password": "text"}
          className="input-tag"
          name="password"
          required
          value={formDetails.password}
          onChange={handleChange}
          style={{paddingRight:'40px'}}
        />
        <span className='show-pass' style={{top:14,right:15}} onClick={()=>setShowIcon(!showIcon)}>{showIcon ? "Show" : 'Hide'}</span>
        </div>
      </div>
      <button type="button" className="login-btn" onClick={handleSubmit}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
