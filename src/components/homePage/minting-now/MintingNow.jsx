import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const MintingNow = () => (
  <div id="minting-now">
    <NFTContainer images={listOfNFTs} title="Minting Now"/>
  </div>
)

export default MintingNow;
