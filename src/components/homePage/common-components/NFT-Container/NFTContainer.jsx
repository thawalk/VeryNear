import React from 'react';
import ImageSlider from '../../common-components/image-slider/ImageSlider';
import AboutUsPerson from '../about-us-person/AboutUsPerson';
import './nft-container.css';
import '../NFT/nft.css'

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
              images.map((imageHash, index) => {
                return <AboutUsPerson imgUrl={imageHash.image} name={imageHash.name} url={imageHash.linkedin} key={index}/>
              })
              :
              images.map((group, index) => {
                return (
                <div className="very-near__nft" key={index}>
                  <div className="very-near__nft-image">
                    <ImageSlider slides={group} showOptionsFunc={showOptionsFunc} />
                  </div>
                </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
};

export default NFTContainer;