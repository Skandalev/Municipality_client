import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./modalStyles.css";

export default function CloseForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseForm = () => {
    navigate("/");
    sessionStorage.removeItem("hazard");
    sessionStorage.removeItem("hazard-location");
    sessionStorage.removeItem("hazard-images");
    handleClose();
  };
  return (
    <>
      <i
        style={{ margin: "0px 15px", transform: "scale(1.4)" }}
        onClick={handleShow}
      >
        <AiOutlineClose />
      </i>

      <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
        <Modal.Body>האם לבטל דיווח נוכחי?</Modal.Body>
        <Modal.Footer>
          <Button className="button-close" variant="info" onClick={handleClose}>
            לא
          </Button>
          <Button
            className="button-close"
            variant="info"
            onClick={handleCloseForm}
          >
            כן
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
