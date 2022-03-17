import React from 'react';
import AboutUsPerson from '../about-us-person/AboutUsPerson';
import NFT from '../NFT/NFT';
import './nft-container.css';

const NFTContainer = ({ images, title, source, showOptionsFunc }) => {
  return (
    <div className="very_near__nft-container section__padding">
      <div className="very-near__nft-container-heading">
        <h1 className="white__text">{title}</h1>
      </div>
      <div className="very-near__nft-container-container">
        <div className="very-near__nft-container-container_groupB">
          {
            source === "about-us" ?
              images.map((imageHash) => {
                return <AboutUsPerson imgUrl={imageHash.image} name={imageHash.name} url={imageHash.linkedin} />
              })
              :
              images.map((image) => {
                return <NFT imgUrl={image} showOptionsFunc={showOptionsFunc} />
              })
          }
        </div>
      </div>
    </div>
  )
};

export default NFTContainer;