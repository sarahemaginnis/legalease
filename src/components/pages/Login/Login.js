import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import LoginDesk from "./login-desk.png";
import { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("legalease_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <div className="card__login">
        <Container>
          <Row className="card__login__row gx-0">
            <Col sm={4}>
              <main style={{ textAlign: "center" }} className="login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                  <div>User does not exist</div>
                  <button
                    className="button--close"
                    onClick={(e) => existDialog.current.close()}
                  >
                    Close
                  </button>
                </dialog>
                <section>
                <form className="form--login" onSubmit={handleLogin}>
                  <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                  <fieldset>
                    <label htmlFor="inputEmail"> Email </label>
                    <input
                      onChange={evt => set(evt.target.value)}
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      required autoFocus
                    />
                  </fieldset>
                  <fieldset>
                    <button type="submit" className="btn__btn-primary"> Login </button>
                  </fieldset>
                </form>
                </section>
                <section className="link--register">
                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
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
      </div>
    )
}

export default Login