import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar";
import { db } from "../../Firebase";
import "../../Styles/globelStyles.css";
import { getDiseaseNavigationPath } from "../../Utils/utils";
import "./styles.css";

const NewTest = () => {
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [diseasesData, setDiseasesData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPatientAndDiseasesData();
  }, []);

  const getPatientAndDiseasesData = async () => {
    setLoader(true);
    try {
      await getDocs(collection(db, "patients")).then((querySnapshot) => {
        const apiPatientData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          patientDocid: doc.id,
        }));
        setPatientData(apiPatientData);
      });
      await getDocs(collection(db, "diseases")).then((querySnapshot) => {
        const apiDiseasesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docID: doc.id,
        }));
        setDiseasesData(apiDiseasesData);
      });
    } catch (error) {
      alert("Something went wrong while fetching patients list");
    }
    setLoader(false);
  };

  const handleClickNext = () => {
    if (selectedDisease === null || selectedPatient === null) {
      alert(
        `Please select ${
          !selectedPatient ? "Patient" : !selectedDisease ? "Disease" : ""
        }`
      );
    }
    const selectedPatientDetails = patientData.find(
      (item) => item.patientDocid === selectedPatient
    );
    console.log(selectedDisease);
    const selectedDiseaseDetails = diseasesData.find(
      (item) => item.docID === selectedDisease
    );
    console.log({ selectedPatientDetails, selectedDiseaseDetails });
    // ...navigate to the required test page
    const navigationPath = getDiseaseNavigationPath(
      selectedDiseaseDetails.diseaseName
    );
    console.log(navigationPath);
    navigate(navigationPath, {
      state: {
        patientDetails: selectedPatientDetails,
        diseaseDetails: selectedDiseaseDetails,
      },
    });
  };

  const handleClickAddNewPatient = () => {
    navigate("/addNewPatient");
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="new-test-wrapper">
          <div className="new-test-container">
            <div className="title">
              <h2>Select patient</h2>
            </div>
            {!loader ? (
              <>
                <div className="input-container">
                  <select
                    name="patient"
                    id="patient1"
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
                    <option value="none">Select Patient</option>
                    {patientData.length > 0 &&
                      patientData.map((item) => (
                        <option
                          key={item.patientDocid}
                          value={item.patientDocid}
                        >{`${item?.firstName} ${item?.lastName}`}</option>
                      ))}
                  </select>
                </div>
                <div className="input-container">
                  <select
                    name="disease"
                    id="disease1"
                    onChange={(e) => setSelectedDisease(e.target.value)}
                  >
                    <option value="none">Select Disease</option>
                    {diseasesData.length > 0 &&
                      diseasesData.map((item) => (
                        <option key={item.docID} value={item.docID}>
                          {item?.diseaseName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="button-container">
                  <div className="button" onClick={handleClickNext}>
                    Next
                  </div>
                </div>
                <div className="container-footer">
                  <div
                    className="add-new-patient-text"
                    onClick={handleClickAddNewPatient}
                  >
                    Add New Patient
                  </div>
                </div>
              </>
            ) : (
              <Circles
                height="80"
                width="80"
                color="#fff"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTest;
