import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalUserVerified.css";

const ModalUserVerified = ({ ...props }) => {
  return (
    <Modal
      {...props}
      size="sm"
      centered
      className="modal__verification"
    >
      <Modal.Header className="modal__header" closeButton></Modal.Header>
      <Modal.Body className="modal__body">
        <p>Account with that email address already exists</p>
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <button className="btn__btn-secondary" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUserVerified;