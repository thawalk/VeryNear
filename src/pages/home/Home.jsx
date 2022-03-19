import React from "react";
import Header from "../../components/homePage/header/Header";
import MintingNow from "../../components/homePage/minting-now/MintingNow";
import Upcoming from '../../components/homePage/upcoming/Upcoming';
import PastMints from '../../components/homePage/past-mints/PastMints';
import LauchSteps from '../../components/homePage/launch-steps/LaunchSteps';
import AboutUs from '../../components/homePage/about-us/AboutUs';
import "../../App.css"

function Home({ showOptionsFunc, currentUser, login }) {
  return (
    <div style={{ paddingTop: '46px' }}>
      <Header showOptionsFunc={showOptionsFunc} />
      <MintingNow showOptionsFunc={showOptionsFunc} />
      <Upcoming showOptionsFunc={showOptionsFunc} />
      {/* <LauchSteps showOptionsFunc={showOptionsFunc} /> */}
      <PastMints showOptionsFunc={showOptionsFunc} />
      <AboutUs showOptionsFunc={showOptionsFunc} />
    </div>
  );
}

export default Home;