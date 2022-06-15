import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./SignUp.css";
import { Container, Row, Col } from "react-bootstrap";
import signUpDesk from "./sign-up-desk.png";

const SignUp = (props) => {
  const [user, setUser] = useState({});
  const conflictDialog = useRef();

  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("legalease_user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <div className="card__signup">
      <Container>
        <Row className="card__signup__row gx-0">
          <Col sm={4}>
            <main style={{ textAlign: "center" }} className="signup">
              <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button
                  className="button--close"
                  onClick={(e) => conflictDialog.current.close()}
                >
                  Close
                </button>
              </dialog>

              <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <fieldset>
                  <label htmlFor="name"> Full Name </label>
                  <input
                    onChange={updateUser}
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    autoFocus
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="email"> Email </label>
                  <input
                    onChange={updateUser}
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                  />
                </fieldset>
                <fieldset>
                  <button type="submit" className="btn__btn-primary"> Sign Up </button>
                </fieldset>
              </form>
              <p>Already have an account? <Link to="/login">Log In</Link></p>
            </main>
          </Col>
          <Col sm={8}>
            <img
              className="image__signup"
              src={signUpDesk}
              alt="a desk with a computer, plant, pencil holder, and chair"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
