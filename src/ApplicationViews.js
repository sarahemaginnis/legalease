import React from "react";
import { Route } from "react-router-dom";
import NewBriefForm from "./components/organisms/brief/BriefForm";
import About from "./components/pages/about/About";
import Account from "./components/pages/account/Account";
import Brief from "./components/pages/brief/Brief";
import Contact from "./components/pages/contact/Contact";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Landing from "./components/pages/landing/Landing";
import Login from "./components/pages/login/Login";
import SignUp from "./components/pages/signUp/SignUp";

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
      <Route exact path="/brief/:briefId(\d+)">
        <Brief />
      </Route>
      <Route path="/brief/create">
        <NewBriefForm />
      </Route>
      <Route exact path="/account/:userId(\d+)">
        <Account />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </div>
  );
};

export default ApplicationViews;