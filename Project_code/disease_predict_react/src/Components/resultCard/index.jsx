import React from "react";
import "./resultCardStyles.css";

const ResultCard = ({ title, result, callback }) => {
  return (
    <div className="result-card-wrapper">
      <div className="result-container">
        <h3>{`The Patient ${
          result ? "does not have" : "does have"
        } ${title}`}</h3>
        <div className="callback-button" onClick={callback}>
          Save
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
