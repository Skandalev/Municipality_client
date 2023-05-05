import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { AiOutlineRight } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./alertStyle.css";

const OneAlert = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="alert-top">
        <div className="navtop-alerts">
          <AiOutlineRight
            className="navtop-alerts-btn-back"
            onClick={() => navigate("/")}
          />
          <h4 style={{ fontSize: "larger" }} className="alert-header">
            {" "}
            מבזק מתאריך {state.createdAt.split("T")[0]}
          </h4>{" "}
        </div>
      </div>
      <img className="alert-head-img" src={state.img} alt="img" />
      <Card className="alert-title-card">
        <h1>{state.title}</h1>
        <p style={{ fontWeight: "500" }}>{state.subTitle}</p>
      </Card>
      <Card className="alert-info-card">
        <p style={{ fontWeight: "500" }}>{state.body}</p>
      </Card>
    </div>
  );
};

export default OneAlert;
