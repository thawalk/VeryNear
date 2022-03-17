import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const Upcoming = ({ showOptionsFunc }) => {

  return (
    <div id="upcoming">
      <NFTContainer images={listOfNFTs} title="Upcoming" showOptionsFunc={showOptionsFunc} />
    </div>
  );
}

export default Upcoming;