import React from "react";
import { useHistory } from "react-router-dom";
import "./LoginRedirectButton.css"

const LoginRedirectButton = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <button className="btn__btn-primary" onClick={handleClick}>
      Login
    </button>
  );
};

export default LoginRedirectButton;
