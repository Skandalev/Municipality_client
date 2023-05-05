import React from "react";
import Lottie from "react-lottie-player";
import NotSupportedGif from "../animations/report animation.json";

const NotSupported = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", margin: "0px 10px" }}>
          {" "}
          <b>
            {" "}
            הממשק שלנו לא תומך במכשיר שלך! <br></br> נסה להשתמש בפלאפון במקום{" "}
          </b>
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            loop
            animationData={NotSupportedGif}
            play
            style={{ width: "80vw", height: "80vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotSupported;
