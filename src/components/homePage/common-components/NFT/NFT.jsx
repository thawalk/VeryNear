import React from 'react';
import './nft.css';

const NFT = ({ imgUrl }) => (
  <div className="very-near__nft">
    <div className="very-near__nft-image">
      <img src={imgUrl} alt="nft_image" />
    </div>
  </div>
);

export default NFT;
