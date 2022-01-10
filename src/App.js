import Home from "./pages/Home";
import Task from "./pages/Task";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import User from "./pages/User";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("loginDetails")) || "";
    if (!details) {
      localStorage.setItem(
        "loginDetails",
        JSON.stringify({
          username: "admin",
          password: "admin",
          isLoggedIn: false,
        })
      );
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/task" component={Task}  />
        <Route path="/user" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
