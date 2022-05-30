import React from "react";
import { Route } from "react-router-dom";
import Account from "./components/pages/Account";
import Brief from "./components/pages/Brief";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

const ApplicationViews = () => {
  return (
    <div>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/brief">
        <Brief />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
    </div>
  );
};

export default ApplicationViews;