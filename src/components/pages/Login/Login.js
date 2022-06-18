import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import LoginDesk from "./login-desk.png";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import React from "react";
import ModalUserVerification from "../../atoms/modal/ModalUserVerification";

const Login = ({setUserId}) => {
  const [email, set] = useState("");
  const [modalShow, setModalShow] = React.useState(0); //State variable for user verification modal
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("legalease_user", exists.id);
        setUserId(exists.id)
        history.push("/dashboard");
      } else {
        setModalShow(1);
      }
    });
  };

  const VerificationModal = () => {
    return (
      <>
        <ModalUserVerification
          show={!!modalShow}
          onHide={() => setModalShow(0)}
        />
      </>
    );
  };

  return (
    <div className="card__login">
      <Container>
        <Row className="card__login__row gx-0">
          <Col sm={4}>
            <main style={{ textAlign: "center" }} className="login">
              <section>
                <form className="form--login" onSubmit={handleLogin}>
                  <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                  <fieldset>
                    <label htmlFor="inputEmail"> Email </label>
                    <input
                      onChange={(evt) => set(evt.target.value)}
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                  </fieldset>
                  <fieldset>
                    <button type="submit" className="btn__btn-primary">
                      {" "}
                      Login{" "}
                    </button>
                  </fieldset>
                </form>
              </section>
              <section className="link--register">
                <p>
                  Need an account? <Link to="/signup">Sign Up</Link>
                </p>
              </section>
            </main>
          </Col>
          <Col sm={8}>
            <img
              className="image__login"
              src={LoginDesk}
              alt="a desk with a computer, plant, pencil holder, and chair"
            />
          </Col>
        </Row>
      </Container>
      {VerificationModal()}
    </div>
  );
};

export default Login;
