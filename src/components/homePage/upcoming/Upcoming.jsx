import React from 'react';
import NFTContainer from '../common-components/NFT-Container/NFTContainer';
import listOfNFTs from './imports';

const Upcoming = (props) => {
  const [showOptions, setShowOptions] = props.showOptions

  return (
    <div id="upcoming">
      <NFTContainer images={listOfNFTs} title="Upcoming" showOptions={[showOptions, setShowOptions]}/>
    </div>
  );
}

export default Upcoming;