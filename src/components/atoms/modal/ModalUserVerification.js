import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalUserVerification.css";

const ModalUserVerification = ({ ...props }) => {
  return (
    <Modal
      {...props}
      size="sm"
      centered
      className="modal__verification"
    >
      <Modal.Header className="modal__header" closeButton></Modal.Header>
      <Modal.Body className="modal__body">
        <p>User does not exist</p>
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <button className="btn__btn-secondary" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUserVerification;
