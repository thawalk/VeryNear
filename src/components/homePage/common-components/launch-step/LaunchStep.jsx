import React from 'react';
import './launch-step.css';

const HomePage = () => (
  <div style={{ backgroundColor: "#6DABF8", height: "400px", width: "400px" }}>HomePage </div>
);

const LaunchStep = ({ stepNumber, description }) => (
  <div className="very-near__launch-step">
    <div className="very-near__launch-step-div">
      {/* <HomePage/> */}
      {/* <img src={imgUrl} alt="nft_image" /> */}
      <div>
        <h1>Step {stepNumber}</h1>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default LaunchStep;