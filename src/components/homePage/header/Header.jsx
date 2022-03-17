import React, { useState } from 'react';
import './header.css';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';
import { login, logout, testDeploy } from '../../../utils'
import { useHistory } from "react-router-dom";


const HomePage = () => (
  <div style={{ backgroundColor: "#6DABF8", height: "1000px" }}>HomePage </div>
);

// const Header = ({ openDialog }) => (

function Header({ showOptionsFunc }) {
  const history = useHistory();
  function checkSignedIn() {
    if (!window.walletConnection.isSignedIn()) {
      login()
    }
    else {
      showOptionsFunc(false)
      let path = '/create' 
      history.push(path);
    }
  }


  return (
      <div className="very-near__header section__padding" id="header">
        <div className="very-near__header-content">
          <h1 style={{ color: "#fff" }}>A NFT launchpad on <span className="gradient__text" >NEAR</span></h1>
          <p>Get started with launching your first NFT project with  <span className="gradient__text" >VeryNear</span></p>
          <div className="very-near__header-content__input">
            <button type="button" onClick={checkSignedIn}>Get Started</button>
          </div>
        </div>
        <div className='very-near__header-image'>
          <ImageSlider slides={SliderData} />
        </div>
        {/* <HomePage/> */}
      </div>
  )
};

export default Header