import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalDeleteBrief.css";

const ModalDeleteBrief = ({ brief, deleteFunction, ...props }) => {
  const deleteBrief = () => {
    deleteFunction(brief.id)
  };

  return (
    <Modal
      {...props}
      size="lg"
      centered
      className="modal__delete"
    >
      <Modal.Header className="modal__header" closeButton></Modal.Header>
      <Modal.Body className="modal__body">
        <h4>Delete {brief ? brief.name : ""}?</h4>
        <p>Are you sure you want to delete this brief?</p>
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <button className="btn__btn-secondary" onClick={props.onHide}>Cancel</button>
        <button className="btn__btn-primary" onClick={deleteBrief}>Delete</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteBrief;
