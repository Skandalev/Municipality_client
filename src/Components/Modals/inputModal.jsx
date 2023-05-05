import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsFillPencilFill } from "react-icons/bs";
import SelectComp from "../Select";
import { useNavigate } from "react-router-dom";
import "./modalStyles.css";

export default function InputModal() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [profession, setProfession] = useState("default");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTitle("");
    setShow(true);
  };

  const handleSubmit = () => {
    sessionStorage.setItem("hazard", JSON.stringify({ title, profession }));
    handleClose();
    navigate("/hazard-image");
  };
  return (
    <>
      <i
        style={{ margin: "0px 15px", transform: "scale(1.4)" }}
        onClick={handleShow}
      >
        <div className="input-container">
          <div className="input-and-svg">
            <BsFillPencilFill color="white" />
            <input
              disabled={true}
              type="text"
              placeholder="יש לרשום את פרטי המפגע"
            />
          </div>
        </div>
      </i>

      <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
        <Modal.Body>פרטי הדיווח</Modal.Body>
        <SelectComp setProfession={setProfession} />
        <textarea
          placeholder="אנא כתוב עד 40 תווים"
          type="text"
          autoFocus
          className="modal-input"
          onChange={(e) => setTitle(e.target.value)}
        />
             <div
              style={{
                textAlign: "center",
                color: "orange",
                paddingBottom: 5,
                fontWeight: 600,
              }}
            >
             חייב לבחור את סוג הדיווח ולהכניס הסבר
            </div>
        <Modal.Footer className="modal-btn">
          <Button variant="info" onClick={handleClose}>
            בטל
          </Button>
          <Button
            disabled={
              title.length > 40 ||
              title.length === 0 ||
              profession.length === 0 ||
              profession === "default"
            }
            variant="info"
            onClick={handleSubmit}
          >
            שלח
          </Button>
        </Modal.Footer>
        {title.length > 40 && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              paddingBottom: 5,
              fontWeight: 600,
            }}
          >
            יותר מדי מלל!{" "}
          </div>
        )}
      </Modal>
    </>
  );
}
