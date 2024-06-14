import React from "react";
import { Circles } from "react-loader-spinner";
import "./styles.css";

const ImageUpload = ({ onSubmit, isLoading, result, onContinue, message }) => {
  return (
    <div className="image-upload-wrapper">
      {!isLoading && result === null ? (
        <>
          <h3>Please upload the image</h3>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="file-custom"
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : isLoading === true && result === null ? (
        <Circles
          height="80"
          width="80"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="result-wrapper">
          <p>
            {result === -1
              ? "Please Select image"
              : result === 0
              ? message[1]
              : message[0]}
          </p>
          <button className="continue-button" onClick={onContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
