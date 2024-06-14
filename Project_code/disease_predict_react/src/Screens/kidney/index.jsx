import React, { useState } from "react";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import { kidneyDieasesInput } from "../../Utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDiseaseTestData } from "../../Firebase";
import ResultCard from "../../Components/resultCard";

const KidneyDisease = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;

  const initialKidneyDiseaseValues = {
    age: "",
    bp: "",
    al: "",
    su: "",
    rbc: "",
    pc: "",
    pcc: "",
    ba: "",
    bgr: "",
    bu: "",
    sc: "",
    pot: "",
    wc: "",
    htn: "",
    dm: "",
    cad: "",
    pe: "",
    ane: "",
  };

  const [kidneyDiseaseValues, setValues] = useState(initialKidneyDiseaseValues);
  const [loader, setLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);

  const onChange = (inputName, value) => {
    setValues({ ...kidneyDiseaseValues, [inputName]: value });
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
      patientDiseaseInputValues: kidneyDiseaseValues,
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date(),
      result: result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoader(false);
    setValues(initialKidneyDiseaseValues);
    navigate("/newTest");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Kidney Disease Prediction</h1>
        </div>
        <div className="input-wrapper">
          {!showResults ? (
            <GroupInput
              data={kidneyDieasesInput}
              dataValue={kidneyDiseaseValues}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={loader}
            />
          ) : (
            <ResultCard
              title={"Kidney Disease"}
              result={result}
              callback={onSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default KidneyDisease;
