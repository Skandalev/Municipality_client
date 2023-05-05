import React from "react";
import axios from "axios";
import "./Location.css";
import LocationAnimation from "./animation/LocationAnimation.json";
import { useState } from "react";
import Navtop from "../../Components/navigate/Navtop";
import BottomNav from "../../Components/navigate/BottomNav";
import Lottie from "react-lottie-player";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Location = () => {
  const toastOptions = {
    position: "top-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputLocation, setInputLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    location && sessionStorage.setItem("hazard-location", location);
  }, [location]);

  useEffect(() => {
    !sessionStorage.getItem("hazard") && navigate("/hazard-type");
  }, [navigate]);
  const getAddress = async (a, b) => {
    setLoading(true);
    const nearLocation = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${a},${b}&key=${process.env.REACT_APP_GOOGLE}&language=iw`
    );
    var english = /([a-zA-Z])\w+/g;
    if (english.test(nearLocation.data.results[0].formatted_address)) {
      toast.error("יש בעיה עם הקליטה בבקשה הכניסו ידנית", toastOptions);
      setLoading(false);
      return;
    }
    setLoading(false);
    setLocation(nearLocation.data.results[0].formatted_address);
    sessionStorage.setItem(
      "hazard-location",
      JSON.stringify(nearLocation.data.results[0].formatted_address)
    );
  };

  function getLocation() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      toast.error("GPS במכשיר זה אין ", toastOptions);
      return;
    }
  }
  function showPosition(position) {
    getAddress(position.coords.latitude, position.coords.longitude);
  }

  const validateLocation = () => {
    const validate = /([a-zA-Z])\w+/g;
    if (validate.test(inputLocation)) {
      toast.error("המיקום שהוזן שגוי, יש להזין בעברית", toastOptions);
    } else setLocation(inputLocation);
  };
  return (
    <div className="location-container">
      <Navtop title="מיקום דיווח" link="/hazard-image" />
      <div className="location-div" style={{ paddingTop: 20 }}>
        <b>מיקום נוכחי לפי GPS</b>
        <div className="location-wrapper" onClick={getLocation}>
          <Lottie loop animationData={LocationAnimation} play />
        </div>
        <div className="input-box">
          <input
            className="location-input"
            type="text"
            placeholder=" הכנס ידנית רחוב ומספר"
            onChange={(e) => setInputLocation(e.target.value)}
          />
          <Button
            className="location-btn"
            variant="primary"
            onClick={validateLocation}
            style={{ marginRight: 10 }}
          >
            בצע
          </Button>
        </div>
        {inputLocation.length > 40 && (
          <b style={{ color: "red", fontWeight: 700 }}>כתובת עד 40 תווים!</b>
        )}
        {loading && <h1 className="location-text">בטעינה..</h1>}
        {!loading && location && <h1 className="location-text">{location}</h1>}
      </div>
      {(sessionStorage.getItem("hazard-location") || location) && (
        <BottomNav link="/hazard-summary"></BottomNav>
      )}
      <ToastContainer />
    </div>
  );
};

export default Location;
