import React from "react";
import Header from "../../components/homePage/header/Header";
import MintingNow from "../../components/homePage/minting-now/MintingNow";
import Upcoming from '../../components/homePage/upcoming/Upcoming';
import PastMints from '../../components/homePage/past-mints/PastMints';
import "../../App.css"

const Home = () => {
  return (
    <div className="App">
      <Header/>
      <MintingNow/>
      <Upcoming/>
      <PastMints/>
    </div>
  );
}

export default Home;