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
import logo from "./logo.png"
import { useHistory } from "react-router-dom";

const NavigationBar = ({userId}) => {
  const history = useHistory();

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/dashboard">
          <img src={logo} width="30" height="30" alt="Sarah Maginnis Productivity" />
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
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/account/${userId}`}>Account</NavDropdown.Item>
              <NavDropdown.Item href="/contact">Feedback</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  localStorage.removeItem("legalease_user") 
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
