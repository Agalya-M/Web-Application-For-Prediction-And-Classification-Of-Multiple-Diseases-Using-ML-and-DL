import React, { useState } from "react";
import "./expandableCardStyles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const ExpandableHeader = ({ data, activeCardId, handleSelect }) => {
  const handleArrowPress = (id) => {
    handleSelect(data.id);
  };
  return (
    <div className="header-wrapper" key={data.id}>
      <div className="header-title">
        <h3>{data.title}</h3>
        <div className="arrow-wrapper" onClick={handleArrowPress}>
          {activeCardId !== data.id ? (
            <KeyboardArrowDownOutlinedIcon className="arrow-icon" />
          ) : (
            <KeyboardArrowUpOutlinedIcon className="arrow-icon" />
          )}
        </div>
      </div>
      {activeCardId === data.id && (
        <div className="content-wrapper">
          <div className="content">
            {data.content.map((item) => {
              return <li>{item}</li>;
            })}
          </div>
          <div className="symptoms-content">
            <h4>Symptoms</h4>
            {data.symptomsContent.map((item) => {
              return <li>{item}</li>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableHeader;
