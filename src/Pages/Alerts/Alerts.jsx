import Lottie from "react-lottie-player";
import ReportAnimation from "../../animations/report animation.json";
import axios from "axios";
import "./alertStyle.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaEdit } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Placeholder from "react-bootstrap/Placeholder";

const toastOptions = {
  position: "top-left",
  autoClose: 2000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [placeHolder, setPlaceHolder] = useState(false);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [body, setBody] = useState();
  const [selectedImg, setSelectedImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("UserLogged"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const fetchAlerts = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/alerts`, config)
          .then((res) => {
            res.data && setAlerts(res.data);
            setPlaceHolder(true);
          });
      } catch (error) {
        toast.error(error.message, toastOptions);
      }
    };
    fetchAlerts();
  }, [user?.token]);
  const postAlert = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/alerts`,
        {
          title,
          subTitle,
          body,
          img: selectedImg,
        },
        config
      );
      handleClose();
      toast.success("המבזק נכנס למערכת בהצלחה!", toastOptions);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      toast.error(error, toastOptions);
    }
  };

  const deleteAlert = async (alert) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/alerts/${alert._id}`,
        config
      );
      toast.success("המבזק נמחק מהמערכת בהצלחה!", toastOptions);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  useEffect(() => {
    const getSelectedImg = async () => {
      if (selectedImg) {
        if (
          selectedImg.type === "image/jpeg" ||
          selectedImg.type === "image/png"
        ) {
          try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", selectedImg);
            formData.append("upload_preset", "dimona-citizen-app");
            await axios
              .post(
                "https://api.cloudinary.com/v1_1/ofekyehoshua/image/upload",
                formData
              )
              .then((res) => setSelectedImg(res.data.secure_url));
            setLoading(false);
          } catch (err) {
            toast.error(err.message, toastOptions);
          }
        }
      }
    };
    getSelectedImg();
  }, [selectedImg]);

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <>
        <div className="nav-all-alerts">
          <AiOutlineRight
            style={{ position: "absolute", right: "1rem", fontSize: 25 }}
            onClick={() => navigate("/")}
          />
          <h1 className="nav-alerts-header">כל המבזקים</h1>
          {user?.isAdmin && (
            <div onClick={handleShow} className="nav-alerts-edit-btn">
              <FaEdit />
              הוסף מבזק
            </div>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>העלאת מבזק</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="הכנס את הכותרת"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="הכנס את הכותרת משנה"
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    size="lg"
                    as="textarea"
                    placeholder="הכנס את גוף הכתבה"
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    accept="application/pdf, image/png"
                    onChange={(e) => setSelectedImg(e.target.files[0])}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                סגור
              </Button>
              <Button
                variant="primary"
                type="button"
                disabled={loading}
                onClick={postAlert}
              >
                העלה
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
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
      ) : alerts.length > 0 ? (
        <>
          {alerts?.map((alert) => (
            <div key={alert._id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px 5px",
                    justifyContent: "space-around",
                    width: "100%",
                    alignItems: "center",
                    boxShadow: "-5px 5px 15px 0px rgba(0, 0, 0, 0.603)",
                  }}
                  onClick={() => navigate("/onealert", { state: alert })}
                >
                  <img className="alert-img" src={alert.img} alt="img" />
                  <div className="card-info" style={{ width: "60%" }}>
                    <h1 className="alert-title">{alert.title}</h1>
                    <span className="alert-date">
                      {alert.createdAt && alert.createdAt.split("T")[0]}
                    </span>
                  </div>
                </Card>
                {user?.isAdmin && (
                  <div
                    className="remove-btn-alerts"
                    onClick={() => deleteAlert(alert)}
                  >
                    <AiOutlineDelete style={{ fontSize: 30 }} />
                  </div>
                )}
              </div>
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
        alerts.length === 0 && (
          <>
            <Lottie
              loop
              animationData={ReportAnimation}
              play
              style={{ width: 400, height: 600 }}
            />
          </>
        )
      )}
      <ToastContainer />
    </div>
  );
};

export default Alerts;
