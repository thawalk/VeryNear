import React, { useEffect, useState } from 'react';
import './mint.css';
import nft_1 from '../../assets/minting-now-assets/nft_1.png'
import { useHistory } from "react-router-dom";
import randomInteger from 'random-int';
import { NEAR } from "near-units";
import * as nearAPI from 'near-api-js';
import { async } from 'regenerator-runtime';
import { provider } from '../../utils';
import getConfig from '../../config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const {
	utils: {
		format: {
			formatNearAmount, parseNearAmount
		}
	}
} = nearAPI;

const toastId = "preventDuplicateId"

const mintData = { // TODO: UPDATE THIS
    name: "Monkey Business Collection",
    description: "Where 500 randomly generated NFTs on the NEAR blockchain generating $BANANA. Your NFT itself doubles as membership to Big Balla Chimps with exclusive access to a well-structured community, limited merchandise, web-casino, events, and other collections such as Big Balla Mutants. Our goal is to help anyone break their way into the NFT world successfully while having fun."
}

const Mint = ({ currentUser, login, contract, wallet, logout }) => {
    const [nftMedia, setNftMedia] = useState('')
    const nearConfig = getConfig(process.env.NODE_ENV || 'development')
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
    const handleMint = async () => {
        await account.functionCall(
            nearConfig.contractName,
            'nft_mint',
            { receiver_id: currentUser.accountId },
            "200000000000000",
            parseNearAmount('1.1'))
    }

    // Function to get NFT TOKEN METADATA.
    const getNftImage = async (tokenId) => {
        const nftTokenMetadata = await contract.nft_token_metadata({ token_id: tokenId})    
        const media = nftTokenMetadata.media

        setNftMedia(media)
        toast.success("Mint successful! Check your NEAR wallet for new mint.", {
            toastId: toastId
        });
    }

    // Function to get the token ID
    // token_id will be passed into testFunc params below to get contract
    const getTokenId = async (txHash, accountId) => {
        const result = await provider.txStatus(txHash, accountId)
        const receipts_outcome = result.receipts_outcome;

        const logs = receipts_outcome[0].outcome.logs[0]

        const jsonString = logs.split(/:(.*)/s)
        const json = JSON.parse(jsonString[1])
        
        const token_id = json.data[0].token_ids[0]  // No null check here.

        if (token_id) {
            getNftImage(token_id)
        }
    }

    // After handleMint, page will re-render with txhash in the url params. Check for txhash
    const queryParams = new URLSearchParams(window.location.search);
    const txHash = queryParams.get('transactionHashes')
    if (txHash && currentUser) {
        getTokenId(txHash, currentUser.accountId)
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
                {currentUser ? (
                    <>
                    <div className="actionButtonWrapper">
                        <button onClick={() => handleMint()}>{ txHash ? 'Mint Again' : 'Mint'}</button>
                        
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

            { nftMedia ? (
                <div className='very-near__mint-image'>
                    <img src={`https://cloudflare-ipfs.com/ipfs/` + nftMedia} alt={mintData.name} height='560px' width='560px' />
                </div>
            ) : (
                <div className='very-near__mint-image'>
                    <img src={nft_1} alt={mintData.name} height='560px' width='560px' />
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Mint;