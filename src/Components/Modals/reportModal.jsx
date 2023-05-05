import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Lottie from "react-lottie-player";
import ReportAnimation from "../../animations/report animation.json";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./modalStyles.css";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PlaceHolderImg from "../../animations/117775-searching-data.json";

const ReportModal = ({ userLogged }) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [placeHolder, setPlaceHolder] = useState(false);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const config = {
          headers: {
            token: `Bearer ${userLogged.token}`,
          },
        };
        setPlaceHolder(false);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL_WORK}/${userLogged._id}`,
          config
        );
        setReports(data);
        setPlaceHolder(true);
      } catch (error) {
        setReports([]);
        setPlaceHolder(true);
      }
    };
    fetchReports();
  }, [userLogged]);

  return (
    <>
      {!placeHolder ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{marginTop:10}}> <b> מחפשים לך מידע.. </b></h2>
            <Lottie
              loop
              animationData={PlaceHolderImg}
              play
              style={{ width: 300, height: 400 }}
            />
          </div>
        </>
      ) : reports.length > 0 ? (
        <>
          {reports.map(
            (report, index) =>
              index < 4 && (
                <Card
                  className="alert-container"
                  key={report._id}
                  onClick={() => navigate("/onereport", { state: report })}
                >
                  <img
                    className="alert-img"
                    src={
                      report.img
                        ? report.img[0]
                        : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    }
                    alt="img"
                  />
                  <div className="card-info">
                    <h1
                      className={
                        report.status === "לא בוצע"
                          ? "alert-title not-done"
                          : report.status === "בביצוע"
                          ? "alert-title ongoing"
                          : "alert-title done"
                      }
                    >
                      {report.status}
                    </h1>
                    <h1 className="alert-title">{report.location}</h1>
                    <span className="alert-date">
                      {report.createdAt.split("T")[0]}
                    </span>
                  </div>
                </Card>
              )
          )}
          <Card
            className="alert-container"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <NavLink to={"/my-reports"}>
              <Button variant="secondary" className="alert-btn-text">
                לכל הדיווחים
                <FaArrowLeft style={{ marginRight: "10px" }} />
              </Button>
            </NavLink>
          </Card>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>אין דיווחים קיימים</h2>
          <Lottie
            loop
            animationData={ReportAnimation}
            play
            style={{ width: 150, height: 250 }}
          />
        </div>
      )}
    </>
  );
};

export default ReportModal;
