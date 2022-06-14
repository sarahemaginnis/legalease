import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Edit.css";
import ClassDropDown from "../../atoms/dropDownComponent/ClassDropDown";
import PartyDropDown from "../../atoms/dropDownComponent/PartyDropDown";
import SubjectDropDown from "../../atoms/dropDownComponent/SubjectsDropDown";
import InputDate from "../../atoms/inputTypeComponent/InputDate";
import InputText from "../../atoms/inputTypeComponent/InputText";
import TextArea from "../../atoms/inputTypeComponent/TextArea";

const Edit = () => {
  const { briefId } = useParams();
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
  //Fetch brief
  useEffect(() => {
    fetch(`http://localhost:8088/briefs/${briefId}`)
      .then((res) => res.json())
      .then((brief) => {
          updatePartyARole(brief.partyOneRole)
          updatePartyBRole(brief.partyTwoRole)
          updateSubject(brief.classId)
          updateClass(brief.casebook)
          updatePageNumbers(brief.pageNumbers)
          updateBriefName(brief.name)
          updateCourt(brief.court)
          updateDateofDecision(brief.decisionDate)
          updateCitation(brief.citation)
          updatePartyOneName(brief.partyOneName)
          updatePartyTwoName(brief.partyTwoName)
          updateCauseOfAction(brief.causeOfAction)
          updateProceduralDisposition(brief.proceduralDisposition)
          updateFacts(brief.facts)
          updateProceduralHistory(brief.proceduralHistory)
          updateIssuesFact(brief.issuesFact)
          updateIssuesLaw(brief.issuesLaw)
          updateHolding(brief.holding)
          updateRules(brief.rules)
          updateRationale(brief.rationale)
          updateConcurringDissentingOpinions(brief.concurringDissentingOpinions)
          updateNotes(brief.classNote)
          updateClassDate(brief.classDate)
      });
  } , []);

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

  const briefUpdateButton = (evt) => {
    evt.preventDefault();
    //Construct a new object to replace the existing one in the API
    const updatedBrief = {
      creatorId: parseInt(localStorage.getItem("legalease_user")),
      id: briefId,
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
    //Perform the PUT HTTP request to replace the resource
    fetch(`http://localhost:8088/briefs/${briefId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBrief),
    }).then(() => {
      history.push(`/brief/${briefId}`);
    });
  };

  return (
    <form className="briefForm">
      <h2 className="briefForm__title">Edit Brief</h2>
      <button
        type="submit"
        className="btn__btn-primary"
        onClick={briefUpdateButton}
      >
        Update Brief
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
              value={pageNumbers}
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
              value={briefName}
            />
          </Col>
          <Col>
            <InputText
              label={"Court"}
              onChange={updateCourt}
              placeholder={"e.g. Supreme Court"}
              value={courtName}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputText
              label={"Date of Decision"}
              onChange={updateDateofDecision}
              placeholder={"e.g. 2003 or Dec. 2, 2003"}
              value={dateOfDecision}
            />
          </Col>
          <Col>
            <InputText
              label={"Citation"}
              onChange={updateCitation}
              placeholder={
                "e.g. United States v. Banks, 540 U.S. 31, 124 S. Ct. 521 (U.S. Dec. 2, 2003)"
              }
              value={citation}
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
              value={partyOneName}
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
              value={partyTwoName}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__facts">Facts:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Facts"} onChange={updateFacts} value={facts} />
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
              value={causeOfAction}
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
              value={proceduralHistory}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__issues">Issues:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Issues of Fact"} onChange={updateIssuesFact} value={issuesFact} />
          </Col>
          <Col>
            <TextArea label={"Issues of Law"} onChange={updateIssuesLaw} value={issuesLaw} />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__holding">Holding:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Holding"} onChange={updateHolding} value={holding} />
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
              value={rules}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__rationale">Rationale:</h3>
      <Container>
        <Row>
          <Col>
            <TextArea label={"Rationale"} onChange={updateRationale} value={rationale} />
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
              value={proceduralDisposition}
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
              value={concurringDissentingOpinions}
            />
          </Col>
        </Row>
      </Container>
      <h3 className="briefForm__classNotes">Class Notes:</h3>
      <Container>
        <Row>
          <Col sm={2}>
            <InputDate label={"Date"} onChange={updateClassDate} value={classDate} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextArea label={"Notes"} onChange={updateNotes} value={notes} />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Edit;
