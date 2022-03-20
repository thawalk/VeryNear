import React from 'react';
import './launch-step.css';

const LaunchStep = ({ stepNumber, description }) => (
  <div className="very-near__launch-step">
    <div className="very-near__launch-step-div">
      <div>
        <h1>Step {stepNumber}</h1>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default LaunchStep;