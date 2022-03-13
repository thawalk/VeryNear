import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import imagesHash from './imports';

const AboutUs = (props) => {
  const [showOptions, setShowOptions] = props.showOptions
  
  return (
    <div id="about-us">
      <NFTContainer images={imagesHash} title="About Us" source="about-us" showOptions={[showOptions, setShowOptions]}/>
    </div>
  )
}

export default AboutUs;