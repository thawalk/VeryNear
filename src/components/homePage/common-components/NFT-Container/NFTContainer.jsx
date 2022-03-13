import React from 'react';
import AboutUsPerson from '../about-us-person/AboutUsPerson';
import NFT from '../NFT/NFT';
import './nft-container.css';

const NFTContainer = (props) => {
  const [showOptions, setShowOptions] = props.showOptions

  return (
    <div className="very_near__nft-container section__padding">
      <div className="very-near__nft-container-heading">
        <h1 className="white__text">{props.title}</h1>
      </div>
      <div className="very-near__nft-container-container">
        <div className="very-near__nft-container-container_groupB">
          {
            props.source === "about-us" ?
              props.images.map((imageHash) => {
                return <AboutUsPerson imgUrl={imageHash.image} name={imageHash.name} url={imageHash.linkedin} />
              })
              :
              props.images.map((image) => {
                return <NFT imgUrl={image} showOptions={[showOptions, setShowOptions]}/>
              })
          }
        </div>
      </div>
    </div>
  )
};

export default NFTContainer;