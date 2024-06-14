import React, { useState } from "react";
import ExpandableHeader from "../../Components/expandableCard";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import { diseaseDetailsData } from "../../Utils/utils";
import "./detailsStyles.css";

const DiseaseDetails = () => {
  const [activeCard, setActiveCard] = useState(1);
  const handleSelect = (id) => {
    setActiveCard(id === activeCard ? "" : id);
  };
  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Diseases</h1>
        </div>
        <div className="expandable-header-wrapper">
          {diseaseDetailsData.map((item) => {
            return (
              <ExpandableHeader
                data={item}
                activeCardId={activeCard}
                handleSelect={handleSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;
