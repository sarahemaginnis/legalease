import React from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./ApplicationViews";
import Footer from "./components/organisms/footer/Footer";
import NavigationBar from "./components/organisms/navbar/NavigationBar";
import Landing from "./components/pages/landing/Landing";
import Login from "./components/pages/login/Login";
import SignUp from "./components/pages/signUp/SignUp";

const App = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("legalease_user")) {
          return (
            <>
              <NavigationBar />
              <ApplicationViews />
              <Footer />
            </>
          );
        } else {
          return (
          <Redirect to="/landing" />);
        }
      }}
    />

    <Route path="/landing">
      <Landing />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
  </>
)

export default App;
