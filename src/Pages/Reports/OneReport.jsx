import { useEffect, useState } from "react";
import {
  AiOutlineRight,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import "./OneReport.css";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

export const ProgressB = () => {
  const location = useLocation()
  const state = location.state
  return (
    <StepProgressBar
      startingStep={
        state?.status === "לא בוצע" ? 0 : state?.status === "בביצוע" ? 1 : 2
      }
      steps={[
        {
          label: "הגיע למערכת",
          name: "step 3",
        },
        {
          label: "דיווח בביצוע",
          name: "step 2",
        },
        {
          label: "דיווח טופל",
          name: "step 1",
        },
      ]}
    />
  );
};

const OneReport = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [open, isOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  function Opening() {
    return (
      <div className="reports-details">
        <h5>
          <b className="reports-details-title">מיקום המפגע:</b>
        </h5>
        <h5 className="reports-details-value">{state?.location}</h5>
        <h5>
          <b className="reports-details-title">תיאור:</b>
        </h5>
        <h5 className="reports-details-value">{state?.body}</h5>
        <h5>
          <b className="reports-details-title">תאריך:</b>
        </h5>
        <h5 className="reports-details-value">
          {state?.createdAt.split("T")[0]}
        </h5>
      </div>
    );
  }
  return (
    <div>
      <div className="alert-top">
        <div className="navtop-alerts">
          <AiOutlineRight
            className="navtop-alerts-btn-back"
            onClick={() => navigate("/my-reports")}
          />
          <h4 style={{ fontSize: "larger" }} className="alert-header">
            דיווח מתאריך {state?.createdAt.split("T")[0]}
          </h4>

          <HiOutlineX
            className="navtop-alerts-btn-out"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div>
        <img
          className="alert-head-img"
          src={
            state?.img
              ? state.img[0]
              : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
          }
          alt="img"
        />
      </div>
      <div>
        <ProgressB />
        <button onClick={() => isOpen(!open)} className="details-btn">
          <h4>
            {open ? (
              <AiOutlineMinusCircle className="report-icon" />
            ) : (
              <AiOutlinePlusCircle className="report-icon" />
            )}
            <b>פרטי דיווח</b>
          </h4>
        </button>
        {open && <Opening />}
      </div>
      <div className="report-status">
        <h4>
          <b>
            סטטוס:{" "}
            <b
              className={
                state?.status === "לא בוצע"
                  ? "not-done"
                  : state?.status === "בביצוע"
                  ? "ongoing"
                  : "done"
              }
            >
              {state?.status}
            </b>
          </b>
        </h4>
      </div>
    </div>
  );
};

export default OneReport;
