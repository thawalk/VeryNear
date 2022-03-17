import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const MintingNow = (props) => {
  const [showOptions, setShowOptions] = props.showOptions
  
  return (
  <div id="minting-now">
    <NFTContainer images={listOfNFTs} title="Minting Now" showOptions={[showOptions, setShowOptions]}/>
  </div>
  );
};

export default MintingNow;
