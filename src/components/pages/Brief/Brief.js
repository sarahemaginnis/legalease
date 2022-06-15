import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "bootstrap";
import "./Brief.css";

const Brief = () => {
  const [brief, set] = useState({}); // State variable for current brief object
  const { briefId } = useParams(); // Variable storing the route parameter
  const [subjects, syncSubjects] = useState([]); //State variable for array of subjects
  const [parties, syncParties] = useState([]); //State variable for array of parties
  const [classes, syncClasses] = useState([]); //State variable for array of classes
  const [subjectName, setSubjectName] = useState("")
  // const [partyOneRoleName, setPartyOneRoleName] = useState("")
  // const [partyTwoRoleName, setPartyTwoRoleName] = useState("")

  const history = useHistory();

  useEffect(() => {
    //This function runs when the value of briefId changes
    fetch(`http://localhost:8088/briefs/${briefId}?_expand=class`)
      .then((res) => res.json())
      .then(set);
  }, [briefId]);

  useEffect(() => {
    fetch(`http://localhost:8088/subjects`)
      .then((res) => res.json())
      .then((data) => {
        syncSubjects(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/parties`)
      .then((res) => res.json())
      .then((data) => {
        syncParties(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/classes`)
      .then((res) => res.json())
      .then((data) => {
        syncClasses(data);
      });
  }, []);

  useEffect(() => {
    if (subjects.length && brief.class) {
      setSubjectName(subjects.find((subject) => {
        return subject.id === brief.class.subjectId
      }))
    }
  }, [brief, subjects])

  // const subjectName = subjects.find((subject) => {
  //   return subject.id === brief.class.subjectId;
  // });

  const partyOneRoleName = parties.find((party) => {
    return party.id === brief.partyOneRole;
  });

  const partyTwoRoleName = parties.find((party) => {
    return party.id === brief.partyTwoRole;
  });

  const editBrief = (e, id) => {
    e.stopPropagation();
    return history.push(`/brief/edit/${id}`);
  };

  if (subjects.length && classes.length && parties.length) return (
    <Container className="brief">
      <Row>
        <Col>
          <h2 className="brief__name">{brief.name}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="brief__class">{subjectName ? subjectName.name : ""}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Placeholder for download button</p>
        </Col>
        <Col>
          <p>Placeholder for edit button</p>
          <button
            onClick={(e) => {
              editBrief(e, briefId);
            }}
          >
            Edit
          </button>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>{brief.casebook ? brief.class.casebook : ""}</Col>
          <Col>{brief.pageNumbers ? brief.pageNumbers : ""}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{brief.court ? brief.court : ""}</Col>
          <Col>{brief.decisionDate ? brief.decisionDate : ""}</Col>
          <Col>{brief.citation ? brief.citation : ""}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h3>{brief.classNote ? "Notes:" : ""}</h3>
          </Col>
          <Col>
            <p>{brief.classDate ? brief.classDate : ""}</p>
          </Col>
        </Row>
        <Row>
          <Col>{brief.classNote ? brief.classNote : ""}</Col>
        </Row>
      </Container>
      <h3>{brief.partyOneName ? "Parties:" : ""}</h3>
      <Container>
        <Row>
          <Col>{partyOneRoleName ? partyOneRoleName.party : ""}</Col>
          <Col>{brief.partyOneName ? brief.partyOneName : ""}</Col>
        </Row>
        <Row>
          <Col>{partyTwoRoleName ? partyTwoRoleName.party : ""}</Col>
          <Col>{brief.partyTwoName ? brief.partyTwoName : ""}</Col>
        </Row>
      </Container>
      <h3>{brief.facts ? "Facts:" : ""}</h3>
      <p>{brief.facts ? brief.facts : ""}</p>
      <h3>{brief.holding ? "Holding:" : ""}</h3>
      <p>{brief.holding ? brief.holding : ""}</p>
      <h3>
        {brief.rules ? "Synopsis of Rule of Law & Legal Principles:" : ""}
      </h3>
      <p>{brief.rules ? brief.rules : ""}</p>
      <h3>{brief.rationale ? "Rationale:" : ""}</h3>
      <p>{brief.rationale ? brief.rationale : ""}</p>
      <h3>{brief.causeOfAction ? "Cause of Action:" : ""}</h3>
      <p>{brief.causeOfAction ? brief.causeOfAction : ""}</p>
      <h3>{brief.proceduralHistory ? "Procedural History:" : ""}</h3>
      <p>{brief.proceduralHistory ? brief.proceduralHistory : ""}</p>
      <h3>{brief.issuesFact || brief.issuesLaw ? "Issues:" : ""}</h3>
      <Container>
        <Row>
          <Col>{brief.issuesFact ? brief.issuesFact : ""}</Col>
          <Col>{brief.issuesLaw ? brief.issuesLaw : ""}</Col>
        </Row>
      </Container>
      <h3>{brief.proceduralDisposition ? "Procedural Disposition:" : ""}</h3>
      <p>{brief.proceduralDisposition ? brief.proceduralDisposition : ""}</p>
      <h3>
        {brief.concurringDissentingOpinions
          ? "Concurring & Dissenting Opinion(s):"
          : ""}
      </h3>
      <p>
        {brief.concurringDissentingOpinions
          ? brief.concurringDissentingOpinions
          : ""}
      </p>
    </Container>
  )
  return <></>;
};

export default Brief;
