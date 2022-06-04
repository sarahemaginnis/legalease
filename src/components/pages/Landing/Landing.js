import React from "react";
import landingCoffee from "./landingCoffee.png";
import { Container, Row, Col } from "react-bootstrap";
import LoginRedirectButton from "../../atoms/buttonComponent/LoginRedirectButton";
import "./Landing.css";

const Landing = () => {
  return (
    <div>
      <div className="header">
        <h1>LegalEase</h1>
      </div>
      <Container>
        <Row>
          <Col xs={6}>
            <h2>Organize your study of the law</h2>
            <p>
              The best way to save, annotate, and organize your case briefs and
              class notes for your law school outlines.
            </p>
            <LoginRedirectButton />
          </Col>
          <Col xs={6}>
            <img
              className="image__landing"
              src={landingCoffee}
              alt="a steaming cup of coffee"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
