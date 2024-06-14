import React, { useState } from "react";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import { liverDieasesInput } from "../../Utils/utils";
import { saveDiseaseTestData } from "../../Firebase";
import ResultCard from "../../Components/resultCard";
import { useLocation, useNavigate } from "react-router-dom";

const LiverDiseasePreduction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;
  const initialLiverDiseaseValues = {
    Age: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Protiens: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: "",
    Gender_Male: "",
  };
  const [liverDiseaseValues, setValues] = useState(initialLiverDiseaseValues);
  const [loader, setLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);

  const onChange = (inputName, value) => {
    setValues({ ...liverDiseaseValues, [inputName]: value });
  };

  const onSubmit = () => {
    setLoader(true);
    setTimeout(() => {
      setShowResults(true);
      setLoader(false);
      setResult(random(0, 1));
    }, 2000);
  };

  const onSave = async () => {
    setShowResults(false);
    setLoader(true);
    const payload = {
      patientDiseaseInputValues: liverDiseaseValues,
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date(),
      result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoader(false);
    setValues(initialLiverDiseaseValues);
    navigate("/newTest");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Liver Disease Prediction</h1>
        </div>
        <div className="input-wrapper">
          {!showResults ? (
            <GroupInput
              data={liverDieasesInput}
              dataValue={liverDiseaseValues}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={loader}
            />
          ) : (
            <ResultCard
              title={"Liver Disease"}
              result={result}
              callback={onSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LiverDiseasePreduction;
