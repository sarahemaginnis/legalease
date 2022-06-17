import React from "react";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import "./NavigationBar.css";
import logo from "./logo.png";
import account from "./account.png";
import { useHistory } from "react-router-dom";

const NavigationBar = ({ userId }) => {
  const history = useHistory();

  const accountIcon = (
    <img src={account} alt="person icon" className="navbar__icon" />
  );

  return (
    <Navbar>
      <Container className="navbar__border">
        <Navbar.Brand href="/dashboard">
          <img
            src={logo}
            alt="Sarah Maginnis Productivity"
            className="navbar__logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <NavDropdown title={accountIcon} id="basic-nav-dropdown">
              <NavDropdown.Item href={`/account/${userId}`}>
                Account
              </NavDropdown.Item>
              <NavDropdown.Item href="/contact">Feedback</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  localStorage.removeItem("legalease_user");
                  history.push("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
