import React, { useState, useEffect } from "react";
import "./App.css";
import ApplicationViews from "./ApplicationViews";
import Footer from "./components/organisms/footer/Footer";
import NavigationBar from "./components/organisms/navbar/NavigationBar";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("legalease_user");
    setUserId(parseInt(id));
  }, []);

  return (
    <>
      <NavigationBar setUserId={setUserId} userId={userId} />
      <ApplicationViews setUserId={setUserId} userId={userId} />
      <Footer />
    </>
  );
};

export default App;
