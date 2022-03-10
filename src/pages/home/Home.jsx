import React from "react";
import Header from "../../components/homePage/header/Header";
import MintingNow from "../../components/homePage/minting-now/MintingNow";
import Upcoming from '../../components/homePage/upcoming/Upcoming';
import PastMints from '../../components/homePage/past-mints/PastMints';
import LauchSteps from '../../components/homePage/launch-steps/LaunchSteps';
import AboutUs from '../../components/homePage/about-us/AboutUs';
import "../../App.css"

function Home(props) {
  return (
    <div style={{ paddingTop: '46px' }}>
      <Header showOptions={props.showOptions}/>
      <MintingNow/>
      <Upcoming/>
      <LauchSteps showOptions={props.showOptions}/>
      <PastMints/>
      <AboutUs/>
    </div>
  );
}

export default Home;