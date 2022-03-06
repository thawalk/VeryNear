import React from 'react';
import './nft.css';

const NFT = ({ imgUrl, date, text }) => (
  <div className="very-near__blog-container_article">
    <div className="very-near__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    {/* <div className="very-near__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div> */}
  </div>
);

export default NFT;
