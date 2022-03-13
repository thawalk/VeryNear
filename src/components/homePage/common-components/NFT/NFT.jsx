import React from 'react';
import './nft.css';
import { useHistory } from "react-router-dom";


const NFT = (props) => {
  const history = useHistory();
  const [showOptions, setShowOptions] = props.showOptions
  const mintPage = () => {
    let path = '/mint/monkeyBusiness'
    history.push(path);
    setShowOptions(false)
  }

  return (
    <div className="very-near__nft">
      <div className="very-near__nft-image">
        <img src={props.imgUrl} alt="nft_image" onClick={() => mintPage()} />
      </div>
    </div>
  );
};

export default NFT;
