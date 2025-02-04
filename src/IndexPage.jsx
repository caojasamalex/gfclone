import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/styles.css";
import image from "./css/images/image.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="left-content">
        <h1 className="title">Forms FINK</h1>
        <p className="description">
          Create and share forms effortlessly. Start by logging in or signing up.
        </p>
        <div className="auth-buttons">
          <button className="auth-button" onClick={() => navigate("/login")}>Log In</button>
          <button className="auth-button" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
      <div className="right-image">
        <img src={image} alt="Forms Illustration" />
      </div>
    </div>
  );
};

export default Home;
