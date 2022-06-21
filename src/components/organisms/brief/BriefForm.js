import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ClassDropDown from "../../atoms/dropDownComponent/ClassDropDown";
import PartyDropDown from "../../atoms/dropDownComponent/PartyDropDown";
import SubjectDropDown from "../../atoms/dropDownComponent/SubjectsDropDown";
import InputDate from "../../atoms/inputTypeComponent/InputDate";
import InputText from "../../atoms/inputTypeComponent/InputText";
import TextArea from "../../atoms/inputTypeComponent/TextArea";
import { Container, Row, Col } from "react-bootstrap";

const NewBriefForm = () => {
  const [brief, updateBrief] = useState({
    //update with default fields
  }); //do I still need this?

  const [partyARole, updatePartyARole] = useState(1);
  const [partyBRole, updatePartyBRole] = useState(1);
  const [subjectName, updateSubject] = useState(1);
  const [className, updateClass] = useState(1);
  const [pageNumbers, updatePageNumbers] = useState("");
  const [briefName, updateBriefName] = useState("");
  const [courtName, updateCourt] = useState("");
  const [dateOfDecision, updateDateofDecision] = useState("");
  const [citation, updateCitation] = useState("");
  const [partyOneName, updatePartyOneName] = useState("");
  const [partyTwoName, updatePartyTwoName] = useState("");
  const [causeOfAction, updateCauseOfAction] = useState("");
  const [proceduralDisposition, updateProceduralDisposition] = useState("");
  const [facts, updateFacts] = useState("");
  const [proceduralHistory, updateProceduralHistory] = useState("");
  const [issuesFact, updateIssuesFact] = useState("");
  const [issuesLaw, updateIssuesLaw] = useState("");
  const [holding, updateHolding] = useState("");
  const [rules, updateRules] = useState("");
  const [rationale, updateRationale] = useState("");
  const [concurringDissentingOpinions, updateConcurringDissentingOpinions] =
    useState("");
  const [notes, updateNotes] = useState("");
  const [classDate, updateClassDate] = useState("");

  const [subjects, syncSubjects] = useState([]); //State variable for array of subjects
  const [classes, syncClasses] = useState([]); //State variable for array of classes
  const [parties, syncParties] = useState([]); //State variable for array of parties

  const history = useHistory();

  // Fetch all subjects
  useEffect(() => {
    fetch(`http://localhost:8088/subjects`)
      .then((res) => res.json())
      .then(syncSubjects);
  }, []);

  //Fetch all classes
  useEffect(() => {
    fetch(`http://localhost:8088/classes`)
      .then((res) => res.json())
      .then(syncClasses);
  }, []);

  //Fetch all parties
  useEffect(() => {
    fetch(`http://localhost:8088/parties`)
      .then((res) => res.json())
      .then(syncParties);
  }, []);

  const saveBrief = (event) => {
    event.preventDefault();
    const newBrief = {
      creatorId: parseInt(localStorage.getItem("legalease_user")),
      classId: subjectName,
      casebook: className,
      pageNumbers: pageNumbers,
      name: briefName,
      court: courtName,
      decisionDate: dateOfDecision,
      citation: citation,
      partyOneRole: partyARole,
      partyOneName: partyOneName,
      partyTwoRole: partyBRole,
      partyTwoName: partyTwoName,
      facts: facts,
      causeOfAction: causeOfAction,
      proceduralHistory: proceduralHistory,
      issuesFact: issuesFact,
      issuesLaw: issuesLaw,
      holding: holding,
      rules: rules,
      rationale: rationale,
      proceduralDisposition: proceduralDisposition,
      concurringDissentingOpinions: concurringDissentingOpinions,
      classDate: classDate,
      classNote: notes,
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrief),
    };

    return fetch("http://localhost:8088/briefs", fetchOption).then(() => {
      history.push("/dashboard");
    });
  };

  return (
    <form className="briefForm">
      <h2 className="briefForm__title">New Brief</h2>
      <button className="btn__btn-primary" onClick={saveBrief}>
        Save
      </button>
      <h3 className="briefForm__classInformation">Class Information:</h3>
      <Container>
        <Row>
          <Col sm={2}>
            <SubjectDropDown
              label={"Class"}
              optionList={subjects}
              onChange={updateSubject}
              value={subjectName}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ClassDropDown
              label={"Casebook"}
              optionList={classes}
              onChange={updateClass}
              value={className}
            />
          </Col>
          <Col>
            <InputText
              label={"Page Numbers"}
              onChange={updatePageNumbers}
              placeholder={"e.g. 1-5"}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__caption">Caption:</h3>
      <Container>
        <Row>
          <Col>
            <InputText
              label={"Brief Name"}
              onChange={updateBriefName}
              placeholder={"e.g. Marbury v. Madison"}
            />
          </Col>
          <Col>
            <InputText
              label={"Court"}
              onChange={updateCourt}
              placeholder={"e.g. Supreme Court"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputText
              label={"Date of Decision"}
              onChange={updateDateofDecision}
              placeholder={"e.g. 2003 or Dec. 2, 2003"}
            />
          </Col>
          <Col>
            <InputText
              label={"Citation"}
              onChange={updateCitation}
              placeholder={
                "e.g. United States v. Banks, 540 U.S. 31, 124 S. Ct. 521 (U.S. Dec. 2, 2003)"
              }
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__parties">Parties:</h3>
      <Container>
        <Row>
          <Col sm={2}>
            <PartyDropDown
              label={"Party One Role"}
              optionList={parties}
              onChange={updatePartyARole}
              value={partyARole}
            />
          </Col>
          <Col>
            <InputText
              label={"Party One Name"}
              onChange={updatePartyOneName}
              placeholder={""}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <PartyDropDown
              label={"Party Two Role"}
              optionList={parties}
              onChange={updatePartyBRole}
              value={partyBRole}
            />
          </Col>
          <Col>
            <InputText
              label={"Party Two Name"}
              onChange={updatePartyTwoName}
              placeholder={""}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__facts">Facts:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Facts"} onChange={updateFacts} />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__causeOfAction">Cause of Action:</h3>
      <Container>
        <Row>
          <Col>
            <InputText
              label={"Cause of Action"}
              onChange={updateCauseOfAction}
              placeholder={"e.g. Negligence"}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__proceduralHistory">Procedural History:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea
              label={"Procedural History"}
              onChange={updateProceduralHistory}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__issues">Issues:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Issues of Fact"} onChange={updateIssuesFact} />
          </Col>
          <Col>
            <TextArea label={"Issues of Law"} onChange={updateIssuesLaw} />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__holding">Holding:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Holding"} onChange={updateHolding} />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__rules">
        Synopsis of Rule of Law and Legal Principles
      </h3>
      <Container>
        <Row>
          <Col>
            <TextArea
              label={"Synopsis of Rule of Law & Legal Principles"}
              onChange={updateRules}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__rationale">Rationale:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Rationale"} onChange={updateRationale} />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__proceduralDisposition">
        Procedural Disposition:
      </h3>
      <Container>
        <Row>
          <Col>
            <InputText
              label={"Procedural Disposition"}
              onChange={updateProceduralDisposition}
              placeholder={""}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__concurringDissentingOpinions">
        Concurring and Dissenting Opinions
      </h3>
      <Container>
        <Row>
          <Col>
            <TextArea
              label={"Concurring & Dissenting Opinion(s)"}
              onChange={updateConcurringDissentingOpinions}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__classNotes">Class Notes:</h3>
      <Container>
        <Row>
          <Col sm={2}>
            <InputDate label={"Date"} onChange={updateClassDate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextArea label={"Notes"} onChange={updateNotes} />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default NewBriefForm;
