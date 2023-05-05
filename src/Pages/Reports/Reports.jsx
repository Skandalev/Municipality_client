import Lottie from "react-lottie-player";
import ReportAnimation from "../../animations/report animation.json";
import "./reportStyle.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineRight } from "react-icons/ai";
import Placeholder from "react-bootstrap/Placeholder";


const Reports = () => {
  const userLogged = JSON.parse(localStorage.getItem("UserLogged"));
  const [placeHolder, setPlaceHolder] = useState(false);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate("/");
    }
    const fetchReports = async () => {
      const config = {
        headers: {
          token: `Bearer ${userLogged.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_WORK}/${userLogged._id}`,
        config
      );
      setReports(data);
      setPlaceHolder(true);
    };
    fetchReports();
  }, [navigate, userLogged]);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <div className="navtop-all-reports">
        <AiOutlineRight onClick={() => navigate("/")} />
        <h3>הדיווחים שלך</h3>
      </div>
      {!placeHolder ? (
        <>
          <div style={{ textAlign: "center" }}>
            <Placeholder as="p" animation="glow">
              <Placeholder
                xs={12}
                size="lg"
                style={{
                  width: "95vw",
                  height: "15vh",
                  margin: "10px 0px",
                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </div>
          <div style={{ textAlign: "center" }}>
            <Placeholder as="p" animation="glow">
              <Placeholder
                xs={12}
                size="lg"
                style={{
                  width: "95vw",
                  height: "15vh",
                  margin: "10px 0px",
                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </div>
          <div style={{ textAlign: "center" }}>
            <Placeholder as="p" animation="glow">
              <Placeholder
                xs={12}
                size="lg"
                style={{
                  width: "95vw",
                  height: "15vh",
                  margin: "10px 0px",
                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </div>
          <div style={{ textAlign: "center" }}>
            <Placeholder as="p" animation="glow">
              <Placeholder
                xs={12}
                size="lg"
                style={{
                  width: "95vw",
                  height: "15vh",
                  margin: "5px 0px",
                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </div>
          <div style={{ textAlign: "center" }}>
            <Placeholder as="p" animation="glow">
              <Placeholder
                xs={12}
                size="lg"
                style={{
                  width: "95vw",
                  height: "15vh",
                  margin: "10px 0px",
                  borderRadius: "20px",
                }}
              />
            </Placeholder>
          </div>
        </>
      ) : reports.length > 0 ? (
        <>
          {reports.map((report) => (
            <div key={report._id}>
              <Card
                className="alert-container"
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
                    {report.createdAt && report.createdAt.split("T")[0]}
                  </span>
                </div>
              </Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <hr className="alerts-hr" />
              </div>
            </div>
          ))}
        </>
      ) : (
        reports.length === 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 style={{ paddingRight: "1rem" }}> אין דיווחים קיימים </h2>
            <Lottie
              loop
              animationData={ReportAnimation}
              play
              style={{ width: 400, height: 600 }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Reports;
