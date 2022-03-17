import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const PastMints = ({ showOptionsFunc }) => {

  return (
    <div id="past-mints">
      <NFTContainer images={listOfNFTs} title="Past Mints" showOptionsFunc={showOptionsFunc} />
    </div>
  )
}

export default PastMints;