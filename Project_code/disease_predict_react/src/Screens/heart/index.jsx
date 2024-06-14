import React, { useState } from "react";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import { heartDieasesInputs } from "../../Utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDiseaseTestData } from "../../Firebase";
import ResultCard from "../../Components/resultCard";

const HeartDisease = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;

  const initialHeartDiseaseValues = {
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  };
  const [heartDiseaseValues, setValues] = useState(initialHeartDiseaseValues);
  const [loader, setLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);

  const onChange = (inputName, value) => {
    setValues({ ...heartDiseaseValues, [inputName]: value });
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
      patientDiseaseInputValues: heartDiseaseValues,
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date(),
      result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoader(false);
    setValues(initialHeartDiseaseValues);
    navigate("/newTest");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Heart Disease Prediction</h1>
        </div>
        <div className="input-wrapper">
          {!showResults ? (
            <GroupInput
              data={heartDieasesInputs}
              dataValue={heartDiseaseValues}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={loader}
            />
          ) : (
            <ResultCard
              title={"Heart Disease"}
              result={result}
              callback={onSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartDisease;
