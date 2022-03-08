import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import imagesHash from './imports';

const AboutUs = () => (
  <div id="about-us">
    <NFTContainer images={imagesHash} title="About Us" source="about-us"/>
  </div>
)

export default AboutUs;