import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  button,
  CardGroup,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import "./Dashboard.css";
import edit from "./edit.png";
import trash from "./trash.png";
import add from "./add.png";
import ModalDeleteBrief from "../../atoms/modal/ModalDeleteBrief";
import SubjectDropDown from "../../atoms/dropDownComponent/SubjectsDropDown";

const Dashboard = () => {
  const [briefs, syncBriefs] = useState([]); //State variable for array of briefs
  const [subjects, syncSubjects] = useState([]); //State variable for array of subjects
  const [selectedSubject, setSelectedSubject] = useState(0); //State variable for selected subject in drop-down
  const [modalShow, setModalShow] = React.useState(0); //State variable for delete modal
  const [search, runSearch] = useState(""); //State variable for search bar
  const history = useHistory();
  const user = parseInt(localStorage.getItem("legalease_user"));

  //Fetch all briefs
  useEffect(() => {
    //need to update useEffect to get all briefs after deleting and rendering teh new state
    fetch(`http://localhost:8088/briefs?_expand=class`)
      .then((res) => res.json())
      .then((data) => {
        syncBriefs(data.filter((brief) => brief.creatorId === user)); //filter on the request using this: http://localhost:8088/briefs?_expand=class&creatorId=1
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

  const deleteBrief = (id) => {
    fetch(`http://localhost:8088/briefs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        return fetch(`http://localhost:8088/briefs?_expand=class`);
      })
      .then((res) => res.json())
      .then((data) => {
        syncBriefs(data);
        setModalShow(0);
      });
  };

  const editBrief = (e, id) => {
    e.stopPropagation();
    return history.push(`brief/edit/${id}`);
  };

  const DeleteModal = () => {
    const brief = briefs.find((briefObject) => briefObject.id === modalShow);
    return (
      <>
        <ModalDeleteBrief
          brief={brief}
          deleteFunction={deleteBrief}
          show={!!modalShow}
          onHide={() => setModalShow(0)}
        />
      </>
    );
  };

  const testBriefFilter = (brief) => {
    if (!search) {
      return true;
    } else {
      return Object.values(brief).some((str) =>
        str.toString().toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  return (
    <div>
      <h1>Briefs</h1>
      <Container>
        <Row>
          <Col>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                value={search}
                onChange={(e) => runSearch(e.target.value)}
                aria-label="Search"
              />
              <button className="btn__btn-primary">Search</button>
            </Form>
          </Col>
        </Row>
        <Row xs={1} md={3}>
          <Col>
            <SubjectDropDown
              label={""}
              optionList={[{ id: 0, name: "All Briefs" }, ...subjects]}
              onChange={setSelectedSubject}
              value={selectedSubject}
            />
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-3">
          <Col>
            <Card className="card__dashboard-main">
              <Card.Body className="card__dashboard-body">
                <button
                  onClick={() => history.push("/brief/create")}
                  className="dashboard__button__add"
                >
                  <img
                    src={add}
                    alt="addition symbol"
                    className="dashboard__icon__add"
                  />
                </button>
                <Card.Subtitle>Create a New Brief</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          {briefs
            .filter((brief) => {
              if (selectedSubject === 0) {
                return true;
              } else {
                return brief.classId === selectedSubject;
              }
            })
            .filter(testBriefFilter)
            .map((brief) => {
              const subjectName = subjects.find((subject) => {
                return subject.id === brief.class.subjectId;
              });
              const onClick = () => {
                history.push(`/brief/${brief.id}`);
              };
              return (
                <Col key={`brief__${brief.id}`}>
                  <Card
                    className="card__dashboard-main"
                    onClick={onClick}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Body className="card__dashboard-body">
                      <Card.Title>{brief.name}</Card.Title>
                      <Card.Subtitle>
                        {subjectName ? subjectName.name : ""}
                      </Card.Subtitle>
                      <Card.Text className="card__dashboard-text">
                        Issue: {brief.issuesLaw}
                      </Card.Text>
                      <Card.Text className="card__dashboard-text">
                        Holding: {brief.holding}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        onClick={(e) => {
                          editBrief(e, brief.id);
                        }}
                        className="dashboard__button"
                      >
                        <img
                          src={edit}
                          alt="pencil icon"
                          className="dashboard__icon"
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalShow(brief.id);
                        }}
                        className="dashboard__button"
                      >
                        <img
                          src={trash}
                          alt="trash icon"
                          className="dashboard__icon"
                        />
                      </button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      {DeleteModal()}
    </div>
  );
};

export default Dashboard;
