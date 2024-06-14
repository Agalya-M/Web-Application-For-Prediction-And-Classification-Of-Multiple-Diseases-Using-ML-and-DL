import React from "react";
import "./reportCardStyles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import _ from "lodash";
import emailjs from "@emailjs/browser";
import { json } from "react-router-dom";
import moment from "moment/moment";
import { Timestamp } from "firebase/firestore";

const ReportCard = ({ data, activeCardId, handleSelect }) => {
  const handleArrowPress = (id) => {
    handleSelect(data.id);
  };

  const handleClickMail = async () => {
    try {
      const serviceID = "service_uukt9jp";
      const templateID = "template_jcdtba8";
      const userID = "9J_5ifDvYMkMWSW-2";

      const message = {
        to_mail: data.email, // recipient email address
        from: "agalya12172001@gmail.com", // sender email address
        to_name: `${data.firstName} ${data.lastName}`,
        subject: "Test Report", // email subject
        result: Number(data.result) ? "Positive" : "Negative",
        text: "Here is the test report:",
        disease_test: data.diseaseName, // JSON payload as a string
      };

      await emailjs.send(serviceID, templateID, message, userID);
      alert("Email sent successfully!");
    } catch (error) {
      alert("Error sending email:", error);
    }
  };

  function getDateFromTimestamp(seconds, nanoseconds) {
    const milliseconds = nanoseconds / 1000000; // Convert nanoseconds to milliseconds
    const timestamp = seconds * 1000 + milliseconds; // Combine seconds and milliseconds
    return new Date(timestamp);
  }

  const seconds = data.createdAt.seconds;
  const nanoseconds = data.createdAt.nanoseconds;
  const date = getDateFromTimestamp(seconds, nanoseconds);

  return (
    <div className="header-wrapper" key={data.id}>
      <div className="header-title">
        {/* <h3>{data.title}</h3> */}
        <h3>
          {data.firstName} | {data.diseaseName} |{" "}
          {moment(getDateFromTimestamp(seconds, nanoseconds)).format(
            "MMMM Do YYYY"
          )}
          {moment().diff(
            moment(getDateFromTimestamp(seconds, nanoseconds)),
            "minutes"
          ) < 1 && <span className="new-info">New</span>}
        </h3>
        <div className="arrow-wrapper" onClick={handleArrowPress}>
          {activeCardId !== data.id ? (
            <KeyboardArrowDownOutlinedIcon className="arrow-icon" />
          ) : (
            <KeyboardArrowUpOutlinedIcon className="arrow-icon" />
          )}
        </div>
      </div>
      {activeCardId === data.id && (
        <div>
          <div className="content-wrapper">
            <div className="division">
              <h4 className="report-sub-title">Patient Details</h4>
              <div className="division">
                <p className="report-details">
                  Name: {data.firstName} {data.lastName}
                </p>
                <p className="report-details">ID: {data.patientDocid}</p>
                <p className="report-details">Email: {data.email}</p>
                <p className="report-details">Age: {data.age}</p>
              </div>
            </div>
            <div className="division">
              <h4 className="report-sub-title">Report Details</h4>
              <div className="division">
                <p className="report-details">
                  Disease Name: {data.diseaseName}
                </p>
                <p className="report-details">ID: {data.docID}</p>
                <p className="report-details">
                  Result: {Number(data.result) ? "Positive" : "Negative"}
                </p>
                <p className="report-details">
                  Date/Time:{" "}
                  {moment(getDateFromTimestamp(seconds, nanoseconds)).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
              </div>
            </div>
            {data?.patientDiseaseInputValues && (
              <div className="division">
                <h4 className="report-sub-title">Input Details</h4>
                <div className="division">
                  {Object.entries(data.patientDiseaseInputValues).map(
                    ([key, value]) => (
                      <p className="report-details" key={key}>
                        {key}: {value}
                      </p>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mail-wrapper">
            <div className="mail-container">
              <div className="mail-button" onClick={handleClickMail}>
                Mail
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
