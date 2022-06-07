import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const [briefs, syncBriefs] = useState([]); //State variable for array of briefs
  const [subjects, syncSubjects] = useState([]); //State variable for array of subjects
  const history = useHistory();
  const user = parseInt(localStorage.getItem("legalease_user"));

  //Fetch all briefs
  useEffect(() => {
    fetch(`http://localhost:8088/briefs?_expand=class`)
      .then((res) => res.json())
      .then((data) => {
        syncBriefs(data.filter((brief) => brief.creatorId === user));
      });
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:8088/subjects`)
      .then((res) => res.json())
      .then((data) => {
        syncSubjects(data);
      });
  }, []);
  //need to map through user's briefs and then pass in props: cardTitle, cardSubtitle, cardTextIssue, cardTextHolding

  return (
    <div>
      <h1>The Dashboard Page</h1>
      <h1>Briefs</h1>
      <Container>
        <Row xs={1} md={3} className="g-3">
          <Col>
            <Card className="card__dashboard-main">
              <Card.Body className="card__dashboard-body">
                <button onClick={() => history.push("/brief/create")}>+</button>
                <Card.Subtitle>Create a New Brief</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          {briefs.map((brief) => {
            const subjectName = subjects.find((subject) => {
              return subject.id === brief.class.subjectId;
            });
            return (
              <Col key={`brief__${brief.id}`}>
                <Card className="card__dashboard-main">
                  <Card.Body className="card__dashboard-body">
                    <Card.Title>{brief.name}</Card.Title>
                    <Card.Subtitle>
                      {subjectName ? subjectName.name : ""}
                    </Card.Subtitle>
                    <Card.Text className="card__dashboard-text">
                      {brief.issuesLaw}
                    </Card.Text>
                    <Card.Text className="card__dashboard-text">
                      {brief.holding}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Card Link</Card.Link>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
