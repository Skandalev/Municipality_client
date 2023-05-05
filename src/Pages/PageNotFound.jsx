import React from "react";
import Lottie from "react-lottie-player";
import NotFound from "../animations/report animation.json";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "10vh 0px",
      }}
    >
      <h2 style={{ paddingRight: "1rem" }}> אופס! העמוד לא קיים! </h2>
      <Lottie
        loop
        animationData={NotFound}
        play
        style={{ width: 400, height: 600 }}
      />
      <div
        style={{
          background: "royalblue",
          padding: 10,
          borderRadius: 10,
          color: "white",
        }}
        onClick={() => navigate("/")}
      >
        לחץ כאן לחזור לבית
      </div>
    </div>
  );
};

export default PageNotFound;
