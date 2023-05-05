import "./homeStyle.css";
import AlertModal from "../../Components/Modals/alertModal";
import Drawer from "../../Components/navigate/Drawer/Drawer";
import ReportModal from "../../Components/Modals/reportModal";
import Lottie from "react-lottie-player";
import HomeBackground from "../../animations/70532-background.json";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("UserLogged"));
  return (
    <div>
      <div className="home-container">
        <Drawer />
        <div className="video-container">
          <Lottie loop animationData={HomeBackground} play />
          <div
            className="home-user-container"
            onClick={() => navigate("/user")}
          >
            <div
              style={{ textAlign: "center", fontSize: 50, paddingBottom: 10 }}
            >
              <FaUserAlt />
            </div>
            <h1>ברוך הבא, {userLogged ? userLogged.firstName : "אורח"}</h1>
          </div>
          <div className="home-buttons-container">
            <div
              className="home-button-circle"
              onClick={() => navigate("/hazard-type")}
            >
              <h1 style={{ fontWeight: 700, fontSize: 40 }}> דווח </h1>
              <h1 style={{ fontWeight: 700, fontSize: 40 }}> למוקד </h1>
            </div>
            <div
              className="home-button-lined"
              onClick={() =>
                userLogged ? navigate("/suggestion") : navigate("/register")
              }
            >
              <h1> הצעה לייעול </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="home-lists-container">
        <h3 className="home-header">מבזקים</h3>
        <AlertModal />
      </div>
      {userLogged && (
        <div className="home-lists-container">
          <h3 className="home-header">הדיווחים שלי</h3>
          <ReportModal userLogged={userLogged} />
        </div>
      )}
    </div>
  );
};

export default Home;
