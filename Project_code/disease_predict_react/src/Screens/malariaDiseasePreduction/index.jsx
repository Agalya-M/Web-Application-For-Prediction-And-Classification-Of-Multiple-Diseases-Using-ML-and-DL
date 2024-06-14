import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUpload from "../../Components/ImageInput";
import NavBar from "../../Components/Navbar";
import { db, saveDiseaseTestData } from "../../Firebase";
import "../../Styles/globelStyles.css";

const MalariaDiseasePreduction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state.patientDetails, location.state.diseaseDetails);
  const patientDetails = location.state.patientDetails;
  const diseaseDetails = location.state.diseaseDetails;

  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("http://127.0.0.1:5000/malariapredict", {
      // mode: "no-cors",
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        console.log("res", resp);
        resp.json().then((data) => {
          console.log("malaria pred res => ", data);
          setResult(data.message);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSave = async () => {
    setLoading(true);
    const payload = {
      ...patientDetails,
      ...diseaseDetails,
      createdAt: new Date(),
      result: result,
    };
    console.log(payload);
    await saveDiseaseTestData(payload);
    setLoading(false);
    navigate("/newTest");
  };

  const onContinue = () => {
    onSave();
    setResult(null);
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Malaria Predictor</h1>
        </div>
        <div className="image-wrapper">
          <ImageUpload
            onSubmit={onSubmit}
            isLoading={isLoading}
            result={result}
            onContinue={onContinue}
            message={[
              "This cell is an Infected Malerial Cell.",
              "This cell is not Infected.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MalariaDiseasePreduction;
