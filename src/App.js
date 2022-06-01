import React from "react";
import "./App.css";
import ApplicationViews from "./ApplicationViews";
import Footer from "./components/organisms/footer/Footer";

const App = () => {
  return (
    <div className="App">
      <ApplicationViews />
      <Footer />
    </div>
  );
};

export default App;
