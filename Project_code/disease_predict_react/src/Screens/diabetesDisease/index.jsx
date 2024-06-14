import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { random } from "lodash";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import ResultCard from "../../Components/resultCard";
import { db, saveDiseaseTestData } from "../../Firebase";
import "../../Styles/globelStyles.css";
import { diabetesInputs } from "../../Utils/utils";

const DiabetesDisease = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;

  const initialDiabetesValues = {
    pregnancies: "",
    glucose: "",
    bloodpressure: "",
    skinthickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  };
  const [diabetesValues, setValues] = useState(initialDiabetesValues);
  const [loader, setLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);

  const onChange = (inputName, value) => {
    setValues({ ...diabetesValues, [inputName]: value });
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
      patientDiseaseInputValues: diabetesValues,
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date().toLocaleDateString(),
      result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoader(false);
    setValues(initialDiabetesValues);
    navigate("/newTest");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Diabetes Prediction</h1>
        </div>
        <div className="input-wrapper">
          {!showResults ? (
            <GroupInput
              data={diabetesInputs}
              dataValue={diabetesValues}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={loader}
            />
          ) : (
            <ResultCard title={"Diabetes"} result={result} callback={onSave} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiabetesDisease;
