import React from 'react';
import './about-us-person.css';

const AboutUsPerson = ({ imgUrl, name, url }) => (
  <div className="very-near__about-us-person">
    <div className="very-near__about-us-person-image">
      <a href={url} target="_blank"><img src={imgUrl} alt="about_us_person_image" /></a>
    </div>
    <div className="very-near__about-us-person-label">
      {/* <p style={{cursor:"pointer"}}>{name}</p> */}
      <a href={url} target="_blank">{name}</a>
    </div>
  </div>
);

export default AboutUsPerson;
