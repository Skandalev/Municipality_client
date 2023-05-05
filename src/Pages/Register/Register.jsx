import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Signup from "../../Components/register/Signup";
import Login from "../../Components/register/Login";
import './Register.css'
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <Tabs
        defaultActiveKey="הרשמה"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab variant="white" eventKey="הרשמה" title="הרשמה">
          <div className="return-btn" onClick={() => navigate("/")}>
            <AiOutlineRight />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Signup />
          </div>
        </Tab>
        <Tab eventKey="התחברות" title="התחברות">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="return-btn" onClick={() => navigate("/")}>
              <AiOutlineRight />
            </div>
            <Login />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Register;
