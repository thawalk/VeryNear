import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const MintingNow = () => (
  <div id="minting-now">
    <NFTContainer listOfNFTs={listOfNFTs} title="Minting Now" id="#minting-now"/>
  </div>
)

export default MintingNow;
