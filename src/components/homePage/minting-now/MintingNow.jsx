import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const MintingNow = () => (
  <div id="minting-now">
    <NFTContainer listOfNFTs={listOfNFTs}/>
  </div>
)

export default MintingNow;
