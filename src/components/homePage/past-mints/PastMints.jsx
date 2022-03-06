import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const PastMints = () => (
  <div id="past-mints">
    <NFTContainer listOfNFTs={listOfNFTs} title="Past Mints"/>
  </div>
)

export default PastMints;