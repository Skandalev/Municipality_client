import React, { useState } from "react";
import "./Suggestion.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";

const toastOptions = {
  position: "top-left",
  autoClose: 2000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Suggestion = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState("");
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  let userLogged = localStorage.getItem("UserLogged");
  userLogged = JSON.parse(userLogged);

  useEffect(() => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const formData = new FormData();
      formData.append("file", pic);
      formData.append("upload_preset", "xol71jb0");
      setLoading(true);
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dumgi49os/image/upload",
          formData
        )
        .then((response) => {
          setPicture(response.data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message, toastOptions);
        });
    } else if (pic) {
      toast.error("התמונה לא קיימת", toastOptions);
    }
  }, [pic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      toast.error("חייב נושא וטקסט", toastOptions);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
        },
      };
      setLoading(true);
      const suggestion = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/suggestions/${userLogged._id}`,
        {
          title,
          phone: userLogged.phone,
          body,
          picture,
          email: userLogged.email,
          fullName: userLogged.firstName + " " + userLogged.lastName,
        },
        config
      );
      if (suggestion) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/phone/suggestion`, {
          phone: "+972" + userLogged.phone,
          _uid: userLogged._id,
        });
        toast.success("ההצעה נשלחה", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("בעיה, נסו שוב", toastOptions);
    }
  };

  return (
    <div>
      <div className="suggestion-navtop">
        <AiOutlineRight onClick={() => navigate("/")} />
        <h2>הצעת ייעול לעיר</h2>
      </div>
      <Form>
        <Form.Group className="mb-5 mt-3 ">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="נושא"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
          <Form.Label>טקסט</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder=" אנא הכנס טקסט"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>יש אפשרות לעלות תמונה (לא חובה)</Form.Label>
          <br />
          <Form.Control
            type="file"
            onChange={(e) => {
              setPic(e.target.files[0]);
            }}
          />
        </Form.Group>
        {picture && <img src={picture} alt="" width={100} />}
        <br />
        <Button
          onClick={(e) => {
            handleSubmit(e);
          }}
          variant={!loading ? "primary" : "secondary"}
          type="submit"
          className="custom-btn"
          disabled={
            loading ||
            title.length === 0 ||
            body.length === 0 ||
            title.length > 40
          }
        >
          שלח
        </Button>
      </Form>
      {title.length > 40 && (
        <div style={{ color: "red", textAlign: "center" }}>
          נושא לא יכול להיות מעל 40 תווים!
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Suggestion;
