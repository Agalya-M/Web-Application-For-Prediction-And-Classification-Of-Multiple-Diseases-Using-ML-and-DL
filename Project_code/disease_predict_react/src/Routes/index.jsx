import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Analysis from "../Screens/analysis";
import BreastCancerDisease from "../Screens/breastCancer";
import DiabetesDisease from "../Screens/diabetesDisease";
import DiseaseDetails from "../Screens/diseaseDetails";
import Home from "../Screens/home";
import LiverDiseasePreduction from "../Screens/liverDiseasePreduction";
import MalariaDiseasePreduction from "../Screens/malariaDiseasePreduction";
import PneumoniaPredictor from "../Screens/pneumoniaPredictor";
import HeartDisease from "../Screens/heart";
import KidneyDisease from "../Screens/kidney";
import NewTest from "../Screens/newTest";
import AddNewPatient from "../Screens/addNewPatient";
import PatientReports from "../Screens/reports";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/diseaseDetails" element={<DiseaseDetails />} />
        <Route path="/newTest" element={<NewTest />} />
        <Route path="/addNewPatient" element={<AddNewPatient />} />
        <Route path="/reports" element={<PatientReports />} />
        <Route path="/diabetes" element={<DiabetesDisease />} />
        <Route path="/breastCancer" element={<BreastCancerDisease />} />
        <Route path="/heart" element={<HeartDisease />} />
        <Route path="/liver" element={<LiverDiseasePreduction />} />
        <Route path="/kidney" element={<KidneyDisease />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/malaria" element={<MalariaDiseasePreduction />} />
        <Route path="/pneumonia" element={<PneumoniaPredictor />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
