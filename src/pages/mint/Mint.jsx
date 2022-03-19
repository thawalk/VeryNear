import React, { useEffect, useState } from 'react';
import './mint.css';
import nft_1 from '../../assets/minting-now-assets/nft_1.png'
import { useHistory } from "react-router-dom";
import randomInteger from 'random-int';
import { NEAR } from "near-units";
import * as nearAPI from 'near-api-js';
import { async } from 'regenerator-runtime';
import { provider } from '../../utils';

export const {
	utils: {
		format: {
			formatNearAmount, parseNearAmount
		}
	}
} = nearAPI;

const mintData = {
    name: "Monkey Business Collection",
    description: "Where 500 randomly generated NFTs on the Solana blockchain generating $BANANA. Your NFT itself doubles as membership to Big Balla Chimps with exclusive access to a well-structured community, limited merchandise, web-casino, events, and other collections such as Big Balla Mutants. Our goal is to help anyone break their way into the NFT world successfully while having fun."
}

const Mint = ({ currentUser, login, contract, wallet, logout }) => {
    const history = useHistory();
    const handleConnectWallet = () => {
        if (!currentUser) {
            login()
        }
        else {
            logout()
        }
    }

    const account = wallet.account();

    // When user clicks mint button
    const handleMint = () => {
        console.log("MINTING BIJ")
        console.log("Current user:", currentUser.accountId);
        account.functionCall(
            'nft-example.crypto_overflow.testnet',
            'nft_mint',
            { receiver_id: currentUser.accountId },
            "200000000000000",
            parseNearAmount('0.1'))
    }

    // Function to get the token ID
    // TODO: Get token_id using this function only after handleMint is complete
    // Pass token_id into testFunc params below to get contract
    const getTransactionStatus = async (txHash, accountId) => {
        const result = await provider.txStatus(txHash, accountId)
        console.log("RESULT:", result)

        const receipts_outcome = result.receipts_outcome;
        console.log("RECEIPTS:", receipts_outcome)  // token_id stored in receipts_outcome
    }
    if (currentUser) {
        getTransactionStatus("Ca7qhgQ7MNagDQ7FdtxSGktAr1bJ56kphfPaf9knpcFP", currentUser.accountId)
    }

    // Function to get NFT TOKEN METADATA. It's called directly below..
    // TODO: Get the NFT token metadata only after handleMint is complete in a .then function.. or useEffect
    const testFunc = async () => {
        console.log("calling test func")
        // Hardcoded token ID, TODO: should get from getTransactionStatus -> receipts_outcome
        const help = await contract.nft_token_metadata({ token_id: '0'})    
        console.log("HELP:", help)  // help (aka nft metadata contains the metadata and ipfs hash)
    }
    testFunc()    // Uncomment this to get NFT metadata

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

                {currentUser ? (
                    <>
                    <div className="actionButtonWrapper">
                        <button onClick={() => handleMint()}>Mint</button>
                        
                        {/* <a href='https://uphold.com/en-us/assets/crypto/buy-near' className='buyNearLink'>No NEAR? Buy here.</a> */}
                    </div>
                    <div className="actionButtonWrapperDisconnect">
                    <button onClick={() => handleConnectWallet()}>Disconnect Wallet</button>
                    </div>
                    </>
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