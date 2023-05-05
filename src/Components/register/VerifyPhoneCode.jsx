import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyPhoneCode = () => {
  const navigate = useNavigate();
  const [phoneCode, setPhoneCode] = useState("");
  const userRegister = JSON.parse(sessionStorage.getItem("registerUser"));
  const userLogin = JSON.parse(sessionStorage.getItem("loginUser"));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userLogin && !userRegister) {
      navigate("/register");
    }
  }, [userLogin, userRegister, navigate]);

  const toastOptions = {
    position: "bottom-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const verifyCode = async () => {
    if (userRegister && userLogin) {
      sessionStorage.removeItem("registerUser");
    }
    try {
      setLoading(true);
      if (userRegister && !userLogin) {
        try {
          const codeTrue = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/phone/verify?phonenumber=+972${userRegister.phone}&code=${phoneCode}`
          );
          setLoading(false);
          if (codeTrue.data.data.valid) {
            const newUser = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user`,
              {
                email: userRegister.email,
                firstName: userRegister.firstName,
                lastName: userRegister.lastName,
                phone: userRegister.phone,
              }
            );
            setLoading(false);
            if (newUser) {
              localStorage.setItem("UserLogged", JSON.stringify(newUser.data));
              sessionStorage.removeItem("registerUser");
              navigate("/hazard-summary");
            } else {
              setPhoneCode("");
              toast.error("שגיאה, נסו שוב מאוחר יותר", toastOptions);
              setLoading(false);
            }
          }
        } catch (error) {
          setPhoneCode("");
          setLoading(false);
          toast.error("המספר שהזנת שגוי, נסה שוב", toastOptions);
        }
      } else if (userLogin && !userRegister) {
        try {
          const codeTrue = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/phone/verify?phonenumber=+972${userLogin.phone}&code=${phoneCode}`
          );
          setLoading(false);
          if (codeTrue.data.data.valid) {
            const newUser = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/user/login`,
              {
                phone: userLogin.phone,
              }
            );
            setLoading(false);
            if (newUser) {
              localStorage.setItem("UserLogged", JSON.stringify(newUser.data));
              sessionStorage.removeItem("loginUser");
              navigate("/hazard-summary");
            } else {
              setPhoneCode("");
              toast.error("שגיאה, נסה שוב מאוחר יותר", toastOptions);
              setLoading(false);
            }
          }
        } catch (error) {
          setPhoneCode("");
          setLoading(false);
          toast.error("המספר שהזנת שגוי, נסה שוב", toastOptions);
        }
      }
    } catch {
      setLoading(false);
      toast.error("משהו השתבש", toastOptions);
    }
  };

  const sendAgain = async () => {
    try {
      setLoading(true);
      let sendMessage = {};
      if (userLogin) {
        sendMessage = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/phone/login?phonenumber=+972${userLogin.phone}`
        );
      } else if (userRegister) {
        sendMessage = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/phone/login?phonenumber=+972${userRegister.phone}`
        );
      }
      setLoading(false);
      if (!sendMessage) {
        toast.error("שגיאה, נסה שוב מאוחר יותר", toastOptions);
      } else {
        toast.success("נשלח קוד חדש בהצלחה", toastOptions);
        setLoading(false);
      }
    } catch {
      toast.error("משהו השתבש", toastOptions);
      setLoading(false);
    }
  };

  return (
    <Card style={{ width: "100vw", height: "100vh" }} variant="info">
      <br />
      <br />
      <br />
      <Card.Body>
        <Card.Title> הכנס את הקוד </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          הכנס את הקוד שקיבלתם לנייד 0
          {userRegister ? userRegister.phone : userLogin && userLogin.phone}
        </Card.Subtitle>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col sm="6">
              <Form.Control
                type="number"
                placeholder="******"
                value={phoneCode}
                onChange={(e) => {
                  setPhoneCode(e.target.value);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                חובה להכניס את הקוד
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Button
            onClick={() => {
              verifyCode();
            }}
            variant="info"
            size="lg"
            disabled={loading || phoneCode.length === 0}
          >
            התחבר
          </Button>
          <Button
            disabled={loading}
            onClick={() => sendAgain()}
            variant="danger"
            size="lg"
          >
            לא קיבלתי את הקוד
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default VerifyPhoneCode;
