import React, { useState } from 'react';
import './header.css';
import ImageSlider from '../common-components/image-slider/ImageSlider';
import { SliderData } from './SliderData';
import { useHistory } from "react-router-dom";

function Header({ showOptionsFunc }) {
  const history = useHistory();
  function createPage() {
    showOptionsFunc(false)
    let path = '/create'
    history.push(path);
  }


  return (
    <div className="very-near__header section__padding" id="header">
      <div className="very-near__header-content">
        <h1 style={{ color: "#fff" }}>A NFT launchpad on <span className="gradient__text" >NEAR</span></h1>
        <p>Get started with launching your first NFT project with  <span className="gradient__text" >VeryNear</span></p>
        <div className="very-near__header-content__input">
          <button type="button" onClick={createPage}>Get Started</button>
        </div>
      </div>
      <div className='very-near__header-image'>
        <ImageSlider slides={SliderData} showOptionsFunc={showOptionsFunc}/>
      </div>
    </div>
  )
};

export default Header