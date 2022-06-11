import React from "react";
import "./About.css";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="card__about">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <main className="about">
              <h1>About Us</h1>
              <h2 className="about">
                Keeping your case briefs organized without the extra work.
              </h2>
              <p className="about">
                LegalEase is a productivity tool for law students that keeps
                case briefs organized and easy to annotate with class notes and
                incorporate into outlines without extra work.
              </p>
              <p className="about">
                The amount of reading done in law school is a mountainous mass
                and case briefs are a necessary study aid that help to
                encapsulate and analyze the material that law students must
                digest. The case brief represents a final product after reading
                a case, rereading it, taking it apart, and putting it back
                together again. However, the case brief is just the first step
                in preparing for class discussions and the end-of-semester exam.
                After the case brief comes the class notes and the course
                outline.
              </p>
              <p className="about">
                There is no good way to save, annotate, and track the case
                briefs and class notes that law students take throughout the
                semester, until now. LegalEase takes the pain and frustration
                out of briefing cases, taking class notes, and incorporating
                them into course outlines. LegalEase is the first online law
                school case brief note system that not only saves what is
                important but keeps it organized for you.
              </p>
            </main>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
