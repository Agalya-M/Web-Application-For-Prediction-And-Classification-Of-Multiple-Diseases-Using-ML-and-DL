import React from "react";
import NavBar from "../../Components/Navbar";
import "./homeStyles.css";
import "../../Styles/globelStyles.css";
import landingImage from "../../Assets/landingPageImage.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="home-screen-wrapper">
          <div className="img-container">
            <img src={landingImage} width={"100%"} height={450} />
          </div>
          <div className="title-wrapper">
            <h1>Disease Prediction</h1>
            <p onClick={() => navigate("/newTest")}>Test &rarr;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
