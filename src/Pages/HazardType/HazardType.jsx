import "./HazardType.css";
import dog from "./HazardImages/dog.png";
import ash from "./HazardImages/ash.png";
import GEZEM from "./HazardImages/GEZEM.png";
import park from "./HazardImages/park.png";
import holee from "./HazardImages/holee.jpg";
import ad from "./HazardImages/ad.png";
import walll from "./HazardImages/walll.png";
import gar from "./HazardImages/gar.png";
import tamr from "./HazardImages/tamr.png";
import lamp from "./HazardImages/lamp.png";
import car from "./HazardImages/car.png";
import ma from "./HazardImages/ma.jpg";
import sewerage from "./HazardImages/sewerage.png";
import { useNavigate } from "react-router-dom";
import InputModal from "../../Components/Modals/inputModal";
import CloseForm from "../../Components/Modals/closeFormModal";
import { useEffect } from "react";

const HazardType = () => {
  const navigate = useNavigate();

  const handleClicked = (title, profession) => {
    sessionStorage.setItem("hazard", JSON.stringify({ title, profession }));
    navigate("/hazard-image");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="top">
        <div
          className="nav"
          style={{
            color: "white",
            padding: "12px 0px",
          }}
        >
          <h5 style={{ marginBottom: 0, paddingRight: "40vw" }}>סוג הדיווח</h5>
          <CloseForm />
        </div>

        <InputModal />
      </div>

      <div className="bottom">
        <h5>
          <b>או לבחור מהרשימה</b>
        </h5>
        <div className="list-group">
          <button
            onClick={() => handleClicked("פינוי ערימת גזם", "clean")}
            className="button-container"
          >
            <b className="button-text"> פינוי ערימת גזם </b>
            <img src={GEZEM} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("פינוי ערימת אשפה", "clean")}
            className="button-container"
          >
            <b className="button-text"> פינוי ערימת אשפה</b>
            <img src={ash} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("רחוב לא נקי", "clean")}
            className="button-container"
          >
            <b className="button-text">רחוב לא נקי</b>
            <img src={ma} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("צואת כלבים", "animals")}
            className="button-container"
          >
            <b className="button-text">צואת כלבים</b>
            <img src={dog} alt="img" width="35 vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("גינה ציבורית מלוכלכת", "clean")}
            className="button-container"
          >
            <b className="button-text">גינה ציבורית מלוכלכת</b>
            <img src={park} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("גומה ריקה על המדרכה", "construction")}
            className="button-container"
          >
            <b className="button-text">גומה ריקה על המדרכה</b>
            <img src={holee} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("הדברה/ יתושים", "animals")}
            className="button-container"
          >
            <b className="button-text">הדברה/ יתושים</b>
            <img src={ad} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("ריצוף מפורק", "construction")}
            className="button-container"
          >
            <b className="button-text"> ריצוף מפורק</b>
            <img src={walll} alt="img" width="35vw" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("פינוי מיכל אשפה ירוק מלא", "clean")}
            className="button-container"
          >
            <b className="button-text"> פינוי מיכל אשפה ירוק מלא</b>
            <img src={gar} alt="img" width="35" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("ביוב פתוח", "sewerage")}
            className="button-container"
          >
            <b className="button-text"> ביוב פתוח</b>
            <img src={sewerage} alt="img" width="35" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("תמרור/ סימון כביש חסר", "roads")}
            className="button-container"
          >
            <b className="button-text">תמרור/ סימון כביש חסר</b>
            <img src={tamr} alt="img" width="35" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("פנס רחוב לא תקין", "electricity")}
            className="button-container"
          >
            <b className="button-text">פנס רחוב לא תקין</b>
            <img src={lamp} alt="img" width="35" />
          </button>
          <hr />
          <button
            onClick={() => handleClicked("כלי שיתופי חוסם", "roads")}
            className="button-container"
          >
            <b className="button-text"> כלי שיתופי חוסם</b>
            <img src={car} alt="img" width="35" />
          </button>
          <hr />
          <br />
        </div>
      </div>
    </div>
  );
};

export default HazardType;
