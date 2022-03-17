import React from 'react';
import './nft.css';
import { useHistory } from "react-router-dom";


const NFT = ({ showOptionsFunc, imgUrl }) => {
  const history = useHistory();
  const mintPage = () => {
    let path = '/mint/monkeyBusiness'
    history.push(path);
    showOptionsFunc(false)
  }

  return (
    <div className="very-near__nft">
      <div className="very-near__nft-image">
        <img src={imgUrl} alt="nft_image" onClick={() => mintPage()} />
      </div>
    </div>
  );
};

export default NFT;
