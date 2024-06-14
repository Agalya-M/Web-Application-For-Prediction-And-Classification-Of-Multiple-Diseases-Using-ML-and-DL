import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import GroupInput from "../../Components/groupInput";
import NavBar from "../../Components/Navbar";
import { db } from "../../Firebase";
import "../../Styles/globelStyles.css";
import { addNewPatientInputs } from "../../Utils/utils";
import { v4 as uuid } from "uuid";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const AddNewPatient = () => {
  const unique_id = uuid();
  const navigate = useNavigate();

  const addNewPatientInitialState = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  };
  const [addNewPatientValues, setValues] = useState(addNewPatientInitialState);
  const [loader, setLoader] = useState(false);

  const onChange = (inputName, value) => {
    setValues({ ...addNewPatientValues, [inputName]: value });
  };

  const onSubmit = async () => {
    setLoader(true);
    try {
      await addDoc(collection(db, "patients"), {
        ...addNewPatientValues,
        patientID: unique_id.slice(0, 8),
      });
      alert("Patient added successfully");
      navigate("/newTest");
    } catch (error) {
      alert("something went wrong while adding the patient", error);
    }
    setValues(addNewPatientInitialState);
    setLoader(false);
  };

  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Add New Patient</h1>
        </div>
        <div className="input-wrapper">
          <GroupInput
            data={addNewPatientInputs}
            dataValue={addNewPatientValues}
            onChange={onChange}
            onSubmit={onSubmit}
            isLoading={loader}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewPatient;
