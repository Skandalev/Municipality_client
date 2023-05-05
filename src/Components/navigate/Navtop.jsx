import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import CloseForm from "../Modals/closeFormModal";
import { useNavigate } from "react-router-dom";
import "./Navtop.css";

const Navtop = ({ title, link, notForm }) => {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("UserLogged"));
  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <h5 className="summary-top">
      <div className="nav">
        <button className="back-button" onClick={() => handleClick(link)}>
          <AiOutlineRight className="icon" />
        </button>
        {!notForm ? title : <span>{title}</span >}
        {!notForm && <CloseForm />}
      </div>
    </h5>
  );
};

export default Navtop;
