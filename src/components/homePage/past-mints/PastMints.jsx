import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const PastMints = (props) => {
  const [showOptions, setShowOptions] = props.showOptions

  return (
    <div id="past-mints">
      <NFTContainer images={listOfNFTs} title="Past Mints" showOptions={[showOptions, setShowOptions]}/>
    </div>
  )
}

export default PastMints;