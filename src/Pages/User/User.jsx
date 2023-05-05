import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import EditUserModal from "../../Components/Modals/editUserModal";
import "./User.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const userLogged = JSON.parse(localStorage.getItem("UserLogged"));
  const navigate = useNavigate();

  return (
    <div className="user-page-container">
      <div className="user-navtop">
        <AiOutlineRight onClick={() => navigate("/")} />
        <h2>האיזור האישי</h2>
      </div>
      <div>
        <div className="top">
          <div className="user-info">
            <h1 style={{ color: "white", fontWeight: "600", marginBottom: 30 }}>
              {userLogged ? userLogged.firstName : "אורח"}
            </h1>
            <p style={{ color: "white", fontWeight: "600" }}>
              {" "}
              {userLogged ? userLogged.email : "אימייל"}
            </p>
            <p style={{ color: "white", fontWeight: "600" }}>
              {userLogged ? 0 + userLogged.phone : "פלאפון"}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100vw",
            textAlign: "right",
            background: "royalblue",
            paddingRight: 20,
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <EditUserModal />
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default User;
