import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdModeEditOutline } from "react-icons/md";
import "./editUserModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditUserModal() {
  const userLogged = JSON.parse(localStorage.getItem("UserLogged"));
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState(userLogged?.firstName);
  const [lastName, setLastName] = useState(userLogged?.lastName);
  const [email, setEmail] = useState(userLogged?.email);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setShow(true);
  };

  const toastOptions = {
    position: "top-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (firstName?.length > 15) {
      setError({ msg: "שם פרטי עד 15 תווים!", status: false });
    } else if (lastName?.length > 15) {
      setError({ msg: "שם משפחה עד 15 תווים!", status: false });
    } else {
      setError({ msg: "", status: true });
      const config = {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
        },
      };
      let updatedUser = {};
      if (userLogged && firstName) {
        updatedUser = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user/${userLogged._id}`,
          { firstName: firstName },
          config
        );
      }
      if (userLogged && lastName) {
        updatedUser = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user/${userLogged._id}`,
          { lastName: lastName },
          config
        );
      }
      if (userLogged && email) {
        updatedUser = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user/${userLogged?._id}`,
          { email: email },
          config
        );
      }
      if (updatedUser) {
        updatedUser.data.token = userLogged?.token;
        localStorage.setItem("UserLogged", JSON.stringify(updatedUser.data));
        handleClose();
        toast.success("הפרטים עודכנו בהצלחה!", toastOptions);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    }
  };

  return (
    <>
      <i onClick={() => (userLogged ? handleShow() : navigate("/register"))}>
        <MdModeEditOutline style={{ fontSize: 40, color: "white" }} />
      </i>
      <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
        <Modal.Body>עדכון המשתמש</Modal.Body>
        <input
          className="user-credentials-input"
          placeholder="שם פרטי:"
          type="text"
          autoFocus
          value={firstName && firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="user-credentials-input"
          placeholder="שם משפחה:"
          value={lastName}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="user-credentials-input"
          placeholder="אימייל:"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Modal.Footer className="modal-btn">
          <Button variant="info" onClick={handleClose}>
            בטל
          </Button>
          <Button variant="info" onClick={handleSubmit}>
            שלח
          </Button>
        </Modal.Footer>
        {error.status === false && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              paddingBottom: 5,
              fontWeight: 600,
            }}
          >
            {error.msg}
          </div>
        )}
        {firstName?.length === 0 &&
          lastName?.length === 0 &&
          email?.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "orange",
                paddingBottom: 5,
                fontWeight: 600,
              }}
            >
              לא חייב למלא את כל הפרטים
            </div>
          )}
      </Modal>
      <ToastContainer />
    </>
  );
}
