import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import ReportAnimation from "../../animations/report animation.json";
import axios from "axios";
import "./modalStyles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PlaceHolderImg from "../../animations/63494-file-loading-data.json";
const AlertModal = () => {
  const navigate = useNavigate();
  const [placeHolder, setPlaceHolder] = useState(false);
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setPlaceHolder(false);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/alerts`
        );
        setAlerts(data);
        setPlaceHolder(true);
      } catch (error) {
        setAlerts([]);
        setPlaceHolder(true);
      }
    };
    fetchAlerts();
  }, []);

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
            <h2 style={{ marginTop: 10 }}>
              {" "}
              <b> מחפשים לך מידע.. </b>
            </h2>
            <Lottie
              loop
              animationData={PlaceHolderImg}
              play
              style={{ width: 300, height: 400 }}
            />
          </div>
        </>
      ) : alerts.length ? (
        <>
          {alerts.map(
            (alert, index) =>
              index < 4 && (
                <Card
                  className="alert-container"
                  key={alert._id}
                  onClick={() => navigate("/onealert", { state: alert })}
                >
                  <img className="alert-img" src={alert.img} alt="img" />
                  <div className="card-info">
                    <h1 className="alert-title">{alert.title}</h1>
                    <span className="alert-date">
                      {alert.createdAt.split("T")[0]}
                    </span>
                  </div>
                </Card>
              )
          )}
          <Card
            className="alert-container"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <NavLink to={"/alerts"}>
              <Button variant="secondary" className="alert-btn-text">
                לכל המבזקים
                <FaArrowLeft style={{ marginRight: "10px" }} />
              </Button>
            </NavLink>
          </Card>
        </>
      ) : (
        <>
          <Lottie
            loop
            animationData={ReportAnimation}
            play
            style={{ width: 400, height: 600 }}
          />
        </>
      )}
    </>
  );
};

export default AlertModal;
