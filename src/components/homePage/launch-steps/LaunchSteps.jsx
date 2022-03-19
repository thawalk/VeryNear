import React from 'react';
import LaunchStep from '../common-components/launch-step/LaunchStep';
import './launch-steps.css';
import { useHistory } from "react-router-dom";

const steps = [
  {
    number: 1,
    description: "Connect your NEAR wallet"
  },
  {
    number: 2,
    description: "Prepare and fill up a 10 minute form"
  },
  {
    number: 3,
    description: "Deploy your NFT when its verified by our team!"
  }
]



function LaunchSteps({ showOptionsFunc }) {
  const history = useHistory();
  function createPage() {
    showOptionsFunc(false)
    let path = '/create'
    history.push(path);
  }

  return (
    <div className="very-near__launch-steps section__padding">
      <div className="very-near__launch-steps-heading">
        <h1 className="white__text">Launch your own NFT</h1>
        <p className="white__text">Create and launch your own collection in 3 easy steps</p>
      </div>
      <div className="very-near__launch-steps-container">
        <div className="very-near__launch-steps-container_groupB">
          {steps.map((step, index) => {
            return <LaunchStep stepNumber={step.number} description={step.description} key={index}/>
          })}
        </div>
      </div>
      <div className="very-near__launch-steps-btn" onClick={createPage}>
        <p>Get Started</p>
      </div>
    </div>
  )
};

export default LaunchSteps;
