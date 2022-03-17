import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const MintingNow = ({ showOptionsFunc }) => {
 
  return (
  <div id="minting-now">
    <NFTContainer images={listOfNFTs} title="Minting Now" showOptionsFunc={showOptionsFunc} />
  </div>
  );
};

export default MintingNow;
