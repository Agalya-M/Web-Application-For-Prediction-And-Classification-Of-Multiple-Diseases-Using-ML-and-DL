import React, { useState } from "react";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import "../../Styles/globelStyles.css";
import { breastCancerInputs } from "../../Utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDiseaseTestData } from "../../Firebase";
import ResultCard from "../../Components/resultCard";

const BreastCancerDisease = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;

  const initialBreastCancerValues = {
    radius_mean: "",
    texture_mean: "",
    perimeter_mean: "",
    area_mean: "",
    smoothness_mean: "",
    compactness_mean: "",
    concavity_mean: "",
    concave_points_mean: "",
    symmetry_mean: "",
    radius_se: "",
    perimeter_se: "",
    area_se: "",
    compactness_se: "",
    concavity_se: "",
    concave_points_se: "",
    fractal_dimension_se: "",
    radius_worst: "",
    texture_worst: "",
    perimeter_worst: "",
    area_worst: "",
    smoothness_worst: "",
    compactness_worst: "",
    concavity_worst: "",
    concave_points_worst: "",
    symmetry_worst: "",
    fractal_dimension_worst: "",
  };

  const [breastCancerValues, setValues] = useState(initialBreastCancerValues);
  const [loader, setLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);

  const onChange = (inputName, value) => {
    setValues({ ...breastCancerValues, [inputName]: value });
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
      patientDiseaseInputValues: breastCancerValues,
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date(),
      result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoader(false);
    setValues(initialBreastCancerValues);
    navigate("/newTest");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Breast Cancer Prediction</h1>
        </div>
        <div className="input-wrapper">
          {!showResults ? (
            <GroupInput
              data={breastCancerInputs}
              dataValue={breastCancerValues}
              onChange={onChange}
              onSubmit={onSubmit}
              isLoading={loader}
            />
          ) : (
            <ResultCard
              title={"Breast Cancer"}
              result={result}
              callback={onSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BreastCancerDisease;
