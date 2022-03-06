import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const Upcoming = () => (
  <div id="upcoming">
    <NFTContainer listOfNFTs={listOfNFTs} title="Upcoming"/>
  </div>
)

export default Upcoming;