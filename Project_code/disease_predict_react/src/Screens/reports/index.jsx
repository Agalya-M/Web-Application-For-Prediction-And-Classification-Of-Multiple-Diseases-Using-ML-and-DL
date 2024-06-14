import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import NavBar from "../../Components/Navbar";
import ReportCard from "../../Components/reportCard";
import { db } from "../../Firebase";
import "../../Styles/globelStyles.css";
import "./reportsStyles.css";

const PatientReports = () => {
  const [activeCard, setActiveCard] = useState(1);
  const [reportsData, setReportsData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    setLoader(true);
    try {
      await getDocs(collection(db, "diseaseTests")).then((querySnapshot) => {
        const apiReportsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (apiReportsData.length === 0) {
          setReportsData("No data");
        } else {
          const sortedData = apiReportsData.sort(
            (a, b) => b.createdAt - a.createdAt
          );
          setReportsData(sortedData);
        }
      });
    } catch (error) {
      alert("Something went wrong while fetching reports list");
    }
    setLoader(false);
  };

  const handleSelect = (id) => {
    setActiveCard(id === activeCard ? "" : id);
  };
  return (
    <div className="screen-wrapper-1">
      <NavBar />
      <div className="screen-wrapper-2">
        <div className="title">
          <h1>Reports</h1>
        </div>
        <div className="report-cards-wrapper">
          {reportsData.length > 0 ? (
            reportsData.map((item) => {
              return (
                <ReportCard
                  key={item.id}
                  data={item}
                  activeCardId={activeCard}
                  handleSelect={handleSelect}
                />
              );
            })
          ) : reportsData === "No data" ? (
            <div>No Reports Available</div>
          ) : loader ? (
            <Circles
              height="80"
              width="80"
              color="#000"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PatientReports;
