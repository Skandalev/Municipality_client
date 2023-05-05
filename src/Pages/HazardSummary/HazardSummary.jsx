import "./HazardSummary.css";
import Navtop from "../../Components/navigate/Navtop";
import BottomNav from "../../Components/navigate/BottomNav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HazardSummary = () => {
  const navigate = useNavigate();
  const hazardType = JSON.parse(sessionStorage.getItem("hazard"));
  const hazardImages =
    sessionStorage.getItem("hazard-images") &&
    JSON.parse(sessionStorage.getItem("hazard-images")).allImages;
  const hazardLocation = sessionStorage.getItem("hazard-location");

  useEffect(() => {
    if (!hazardType) {
      navigate("/hazard-type");
    } else if (!hazardLocation) {
      navigate("/hazard-location");
    }
  }, [navigate, hazardType, hazardLocation]);
  return (
    <div className="summary-body">
      <Navtop title="סיכום הדיווח" link="/hazard-location" />
      <div className="summary-bottom-body">
        <h5 className="summary-header">
          <b>מיקום המפגע:</b>
        </h5>
        <p>{hazardLocation}</p>
        <h5 className="summary-header">
          <b>תיאור:</b>
        </h5>
        {hazardType?.title}
      </div>
      <div className="card-summary">
        {hazardImages &&
          hazardImages.map((img, index) => (
            <img key={index} alt="img" variant="top" src={img} />
          ))}
      </div>
      <BottomNav
        link="/"
        last={true}
        location={hazardLocation}
        img={hazardImages && hazardImages}
        body={hazardType?.title}
        profession={hazardType?.profession}
      />
    </div>
  );
};

export default HazardSummary;
