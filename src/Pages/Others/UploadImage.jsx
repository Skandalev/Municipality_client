import React from "react";
// import Drawer from "../../Components/navigate/drawer";
import upload from "../../animations/9948-camera-pop-up.json";
import Lottie from "react-lottie-player";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect } from "react";
import Navtop from "../../Components/navigate/Navtop";
import BottomNav from "../../Components/navigate/BottomNav";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const UploadImage = () => {
  const [allImages, setAllImages] = useState(
    sessionStorage.getItem("hazard-images")
      ? JSON.parse(sessionStorage.getItem("hazard-images")).allImages
      : []
  );
  const [selectedBig, setSelectedBig] = useState(0);
  const [selectedImg, setSelectedImg] = useState("");
  const [uploadedImg, setUploadedImg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setSelectedImg("");
  };

  const handleSubmit = () => {
    setAllImages([...allImages, uploadedImg]);
    allImages.length !== 0 && setSelectedBig(selectedBig + 1);
    handleClose();
  };

  useEffect(() => {
    !sessionStorage.getItem("hazard") && navigate("/hazard-type");
  }, [navigate]);

  useEffect(() => {
    const getSelectedImg = async () => {
      if (selectedImg) {
        if (
          selectedImg.type === "image/jpeg" ||
          selectedImg.type === "image/png"
        ) {
          const formData = new FormData();
          formData.append("file", selectedImg);
          formData.append("upload_preset", "dimona-citizen-app");
          setLoading(true);
          await axios
            .post(
              "https://api.cloudinary.com/v1_1/ofekyehoshua/image/upload",
              formData
            )
            .then((res) => setUploadedImg(res.data.secure_url))
            .catch((err) => {
              
            });
          setLoading(false);
        }
      }
    };
    getSelectedImg();
  }, [selectedImg]);

  const handleRemove = () => {
    const new_arr = [...allImages];
    new_arr.splice(selectedBig, 1);
    selectedBig !== 0 && setSelectedBig(selectedBig - 1);
    setAllImages(new_arr);
    new_arr.length === 0 && sessionStorage.removeItem("hazard-images")
  };
  return (
    <div id="image-container">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>בחר קובץ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <input
              hidden={true}
              id="add-pic"
              type="file"
              accept="application/pdf, image/png"
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <label htmlFor="add-pic" className="upload-file">
              העלה תמונה
            </label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-uploadImage"
            variant="secondary"
            onClick={handleClose}
          >
            סגור
          </Button>
          <Button
            className="btn-uploadImage"
            variant="info"
            disabled={loading || uploadedImg.length === 0}
            onClick={handleSubmit}
          >
            {loading ? "טוען.." : "הוסף"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Navtop title="תמונות (אופציונלי)" link="/hazard-type" />
      {allImages.length === 0 ? (
        <>
          <h1 style={{ paddingTop: 20 }}>הוסף תמונה</h1>
          <Button variant="ghost" onClick={handleShow}>
            <div className="animation-design">
              <Lottie
                loop
                animationData={upload}
                play
                style={{ width: 250, height: 250 }}
              />
            </div>
          </Button>
          <>
            <BottomNav link="/hazard-location" />
          </>
        </>
      ) : (
        <>
          <div
            style={{
              fontSize: 15,
              textAlign: "left",
              padding: "10px 0px 10px 10px",
            }}
          >
            <BsTrash style={{ fontSize: 35 }} onClick={() => handleRemove()} />
          </div>
          <div style={{ width: "100vw" }}>
            <img src={allImages[selectedBig]} alt="" width={350} height={275} />
          </div>
          {allImages &&
            allImages.map(
              (img, index) =>
                index < 4 && (
                  <img
                    className={
                      index === selectedBig
                        ? "mapped-img selected"
                        : "mapped-img"
                    }
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setSelectedBig(index)}
                    width={75}
                    height={75}
                  />
                )
            )}
          {allImages && allImages.length < 4 && (
            <span onClick={handleShow}>
              <img
                src="https://toppng.com/public/uploads/thumbnail/add-camera-icon-icon-add-11553485583xpjt8pbrke.png"
                alt="pic"
                width={70}
                height={70}
              />
            </span>
          )}
          <>
            <BottomNav link="/hazard-location" allImages={allImages} />
          </>
        </>
      )}
    </div>
  );
};

export default UploadImage;
