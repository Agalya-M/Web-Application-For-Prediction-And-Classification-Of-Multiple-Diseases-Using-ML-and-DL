import React from "react";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import "./styles.css";
import chartImage from "../../Assets/chart-image.jpg";

const Analysis = () => {
  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Predictive Analysis</h1>
        </div>
        <div className="chart-image">
          <img src={chartImage} width={"55%"} height={"55%"} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
