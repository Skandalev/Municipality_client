import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (!email || !phone || !firstName || !lastName) {
      toast.error("בבקשה למלא את כל הפרטים", toastOptions);
      return;
    }
    if (phone.startsWith("0")) {
      let arrPhone = phone.split("");
      arrPhone.shift();
      phone = arrPhone.join("");
    }
    setLoading(true);
    try {
      const findUser = await axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/login`, { phone })
        .catch((err) => {
          toast.error(err.message, toastOptions);
        });
      setLoading(false);
      if (!findUser) {
        const sendMessage = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/phone/login?phonenumber=+972${phone}`
        );
        setLoading(false);
        if (sendMessage) {
          sessionStorage.setItem(
            "registerUser",
            JSON.stringify({
              messageSent: true,
              email,
              phone,
              firstName,
              lastName,
            })
          );
          navigate("/verify");
        }
      } else {
        toast.error(" המספר כבר רשום תעברו להתחברות ", toastOptions);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <Card style={{ width: "90%", height: "100%" }} variant="info">
        <Card.Body>
          <Card.Title>רישום זריז</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            אין אפשרות לשלוח את הדיווח ללא רישום
          </Card.Subtitle>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>שם פרטי</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="ישראל"
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback>
                    {" "}
                    חובה להכניס שם פרטי
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    חובה להכניס שם פרטי
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group controlId="validationCustom01">
                <Form.Label>שם משפחה</Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="ישראלי"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback>
                    {" "}
                    חובה להכניס שם משפחה
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    חובה להכניס שם משפחה
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Label>כתובת מייל עדכנית</Form.Label>
              <Col sm="6">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  חובה להכניס מייל
                </Form.Control.Feedback>
              </Col>
              <Form.Label>מספר פלאפון נייד</Form.Label>
              <Col sm="6">
                <Form.Control
                  type="number"
                  placeholder="050-0000000"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  חובה להכניס מספר פלאפון
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Button
              variant="info"
              size="lg"
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading || !email || !phone || !firstName || !lastName}
            >
              שלח
            </Button>
          </Form>
        </Card.Body>
        <ToastContainer />
      </Card>
    </>
  );
}

export default Signup;
