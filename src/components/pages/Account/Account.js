import "./Account.css";
import { Container, Row, Col } from "react-bootstrap";
import account from "./account.png";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InputText from "../../atoms/inputTypeComponent/InputText";

const Account = () => {
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [user, updateUser] = useState({name: "", email: ""}); //State variable for current user object
  const { userId } = useParams(); //Variable storing the route parameter

  const history = useHistory();

  //Fetch the individual user when the paremeter value changes
  useEffect(
    () => {
      fetch(`http://localhost:8088/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          updateUser(data);
        });
    },
    [userId] //Above function runs when the value of userId changes
  );

  useEffect(() => {
    updateName(user.name);
    updateEmail(user.email);
  }, [user]);

  //Function to invoke when the update button is clicked
  const accountUpdateButton = (evt) => {
      evt.preventDefault()
    //Construct a new object to replace the existing one in the API
    const updatedAccount = {
      id: user.id,
      name: name,
      email: email,
    };

    //Perform the PUT HTTP request to replace the resource
    fetch(`http://localhost:8088/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAccount),
    }).then(() => {
        alert("Account update successful!")
      history.push("/dashboard");
    });
  };

  return (
    <>
      <div className="card__acount">
        <Container>
          <Row>
            <Col sm={4}>
              <main className="account">
                <section>
                  <form className="form__acount">
                    <h1 className="h3 mb-3 font-weight-normal">
                      Account Information
                    </h1>
                    <InputText
                      label={"Name"}
                      onChange={updateName}
                      placeholder={user.name}
                      value={name}
                    />
                    <InputText
                      label={"Email"}
                      onChange={updateEmail}
                      placeholder={user.email}
                      value={email}
                    />
                    <fieldset>
                      <button
                        type="submit"
                        className="btn__btn-primary"
                        onClick={accountUpdateButton}
                      >
                        Update Account
                      </button>
                    </fieldset>
                  </form>
                </section>
              </main>
            </Col>
            <Col sm={8}>
              <img
                className="image__account"
                src={account}
                alt="a smartphone with people using it"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Account;
