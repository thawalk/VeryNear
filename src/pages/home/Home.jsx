import React from "react";
import Header from "../../components/homePage/header/Header";
import MintingNow from "../../components/homePage/minting-now/MintingNow";
import "../../App.css"

const Home = () => {
  return (
    <div className="App">
      <Header/>
      <MintingNow/>
    </div>
  );
}

export default Home;