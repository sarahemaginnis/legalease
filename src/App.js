import React from "react";
import "./App.css";
import ApplicationViews from "./ApplicationViews";
import Footer from "./components/organisms/footer/Footer";

const App = () => {
  return (
    <div className="App">
      <h2>Let's get started!</h2>
      <ApplicationViews />
      <Footer />
    </div>
  );
};

export default App;
