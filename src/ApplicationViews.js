import React from "react";
import { Route, Redirect } from "react-router-dom";
import NewBriefForm from "./components/organisms/brief/BriefForm";
import About from "./components/pages/about/About";
import Account from "./components/pages/account/Account";
import Brief from "./components/pages/brief/Brief";
import Contact from "./components/pages/contact/Contact";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Edit from "./components/pages/editBrief/Edit";
import Landing from "./components/pages/landing/Landing";
import Login from "./components/pages/login/Login";
import SignUp from "./components/pages/signUp/SignUp";
import Terms from "./components/pages/Terms/Terms";

const PrivateRoute = ({path, children, userId}) => {
  if (!userId) {
    return(<Redirect to="/landing" />)
  } else {
    return(
      <Route path={path}>{children}</Route>
    )
  }
}

const ApplicationViews = ({userId, setUserId}) => {
  return (
    <div>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/login">
        <Login setUserId={setUserId} />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <PrivateRoute userId={userId} path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute userId={userId} exact path="/brief/:briefId(\d+)">
        <Brief />
      </PrivateRoute>
      <PrivateRoute userId={userId} exact path="/brief/edit/:briefId(\d+)">
        <Edit />
      </PrivateRoute>
      <PrivateRoute userId={userId} path="/brief/create">
        <NewBriefForm />
      </PrivateRoute>
      <PrivateRoute userId={userId} exact path="/account/:userId(\d+)">
        <Account />
      </PrivateRoute>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/terms">
        <Terms />
      </Route>
    </div>
  );
};

export default ApplicationViews;
