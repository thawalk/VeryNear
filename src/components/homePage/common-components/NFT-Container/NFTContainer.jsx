import React from 'react';
import NFT from '../NFT/NFT';
import './nft-container.css';

const NFTContainer = ({ listOfNFTs, title, id  }) => (
  <div className="very_near__nft-container section__padding" id={id}>
    <div className="very-near__nft-container-heading">
      <h1 className="gradient__text">{title}</h1>
    </div>
    <div className="very-near__nft-container-container">
      <div className="very-near__nft-container-container_groupB">
        {listOfNFTs.map((NFTImage) => {
          console.log(NFTImage)
          return <NFT imgUrl={NFTImage} />
        })}
      </div>
    </div>
  </div>
);

export default NFTContainer;