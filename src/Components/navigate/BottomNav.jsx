import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./BottomNav.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BottomNav = ({
  link,
  allImages,
  last,
  location,
  body,
  profession,
  img,
}) => {
  const userLogged = JSON.parse(localStorage.getItem("UserLogged"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: "top-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleNext = async () => {
    if (!last) {
      navigate(link);
      allImages &&
        sessionStorage.setItem("hazard-images", JSON.stringify({ allImages }));
    } else {
      if (localStorage.getItem("UserLogged")) {
        const user = JSON.parse(localStorage.getItem("UserLogged"));
        const newHazard = {
          location,
          body,
          profession,
          img,
          status: "לא בוצע",
          phone: user.phone,
          _uid: user._id,
        };
        const config = {
          headers: {
            token: `Bearer ${user.token}`,
          },
        };
        setLoading(true);
        await axios
          .post(
            `https://dimona-api.cyclic.app/api/hazards/${user._id}`,
            newHazard,
            config
          )
          .then((res) => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/phone/hazzardin`, {
              phone: "+972" + userLogged.phone,
              location,
              _uid: userLogged._id,
            });
          });

        sessionStorage.removeItem("hazard");
        sessionStorage.removeItem("hazard-location");
        sessionStorage.removeItem("hazard-images");
        toast.success("דיווח נשלח בהצלחה!", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 2500);
        setLoading(false);
      } else {
        navigate("/register");
        setLoading(false);
      }
    }
  };

  return (
    <div className="next">
      <Button
        disabled={loading}
        onClick={handleNext}
        size="lg"
        variant="info"
        className="btn"
      >
        {last ? "שלח" : "הבא"}
      </Button>
      <ToastContainer />
    </div>
  );
};

export default BottomNav;
