import React, { useState } from 'react';
import './header.css';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';


const HomePage = () => (
  <div style={{ backgroundColor: "#6DABF8", height: "1000px" }}>HomePage </div>
);

const Header = () => {
  return (
    <div className="very-near__header section__padding" id="home">
      <div className="very-near__header-content">
        <h1 style={{color: "#fff"}}>A Launchpad on</h1>
        <h1 className="gradient__text">Near</h1>
        <p>Random tagline , david finish the figma properly pls</p>
        <div className="very-near__header-content__input">
          <button type="button">Get Started</button>
        </div>
        {/* <div className='very-near__header-content__people'>
        </div> */}
      </div>
      <div className='very-near__header-image'>
        <ImageSlider slides={SliderData} />
      </div>
        {/* <HomePage/> */}
    </div>
  )
}

export default Header