import React, { useState } from 'react';
import './mint.css';
import nft_1 from '../../assets/minting-now-assets/nft_1.png'
import { login, logout, testDeploy } from '../../utils'
import { useHistory } from "react-router-dom";

const mintData = {
    name: "Monkey Business Collection",
    description: "Where 500 randomly generated NFTs on the Solana blockchain generating $BANANA. Your NFT itself doubles as membership to Big Balla Chimps with exclusive access to a well-structured community, limited merchandise, web-casino, events, and other collections such as Big Balla Mutants. Our goal is to help anyone break their way into the NFT world successfully while having fun."
}

const Mint = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const history = useHistory();
    const handleConnectWallet = () => {
        if (!window.walletConnection.isSignedIn()) {
            login()
        }
        else {

        }
    }

    return (
        <div className='very-near__mint section__padding'>
            <div className='content'>
                {/* <div className='title'> */}
                <h1>{mintData.name}</h1>

                <div className='poweredBy'>
                    <button>Powered by <span className="gradient__text" >VeryNear</span></button>
                </div>
                {/* </div> */}
                {/* <p style={{ maxWidth: '400px' }}>{mintData.description}</p> */}
                <p>{mintData.description}</p>

                {window.walletConnection.isSignedIn() ? (
                    <div className="actionButtonWrapper">
                        <button onClick={() => handleConnectWallet()}>Mint</button>
                        {/* <a href='https://uphold.com/en-us/assets/crypto/buy-near' className='buyNearLink'>No NEAR? Buy here.</a> */}
                    </div>
                ) : (
                    <div className="actionButtonWrapper">
                        <button onClick={() => handleConnectWallet()}>Connect Wallet</button>
                        {/* <a href='https://uphold.com/en-us/assets/crypto/buy-near' className='buyNearLink'>No NEAR? Buy here.</a> */}
                    </div>
                )}
                 <a href='https://uphold.com/en-us/assets/crypto/buy-near' className='buyNearLink' target="_blank">No NEAR? Buy here.</a>
            </div>
            <div className='very-near__mint-image'>
                <img src={nft_1} alt={mintData.name} height='560px' width='560px' />
            </div>
        </div>
    );
};

export default Mint;