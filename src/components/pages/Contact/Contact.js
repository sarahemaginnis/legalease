import "./Contact.css";
import { Container, Row, Col } from "react-bootstrap";
import contact from "./contact.png";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputText from "../../atoms/inputTypeComponent/InputText";
import TextArea from "../../atoms/inputTypeComponent/TextArea";

const Contact = () => {
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [message, updateMessage] = useState("");

  const history = useHistory();

  const saveMessage = (event) => {
    event.preventDefault();
    const newMessage = {
      creatorId: parseInt(localStorage.getItem("legalease_user")),
      name: name,
      email: email,
      message: message,
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    };

    return fetch("http://localhost:8088/messages", fetchOption).then(() => {
      history.push("/dashboard");
    });
  };

  return (
    <>
      <div className="card__contact">
        <Container>
          <Row className="card__contact__row gx-0">
            <Col sm={4}>
              <main className="contact">
                <section>
                  <form className="form__contact">
                    <h1 className="h3 mb-3 font-weight-normal">Contact</h1>
                    <p>We love hearing from you.</p>
                    <p>
                      Fill out this form and we'll be sure to get back to you
                      right away.
                    </p>
                    <InputText
                      label={"Your Name"}
                      onChange={updateName}
                      placeholder={""}
                    />
                    <InputText
                      label={"Email"}
                      onChange={updateEmail}
                      placeholder={""}
                    />
                    <TextArea label={"Message"} onChange={updateMessage} />
                    <fieldset>
                      <button
                        type="submit"
                        className="btn__btn-primary"
                        onClick={saveMessage}
                      >
                        Send Your Note
                      </button>
                    </fieldset>
                  </form>
                </section>
              </main>
            </Col>
            <Col sm={8}>
              <img className="image__contact" src={contact} alt="an envelope" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
