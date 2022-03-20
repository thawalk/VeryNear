import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import getConfig from './config'
import * as nearAPI from 'near-api-js'

// Initialize contract & set global variables
export async function initializeContract() {
  // Get network configuration values from config.js
  const nearConfig = getConfig(process.env.NODE_ENV || 'development')

  // Create keystore for signing transactions using the user's key
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initialize connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig })

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near)

  // Load in user's account data
  let currentUser
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    }
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ['nft_token_metadata'],
      changeMethods: ['nft_mint'],
      sender: walletConnection.getAccountId(),
    }
  )
  return { contract, currentUser, nearConfig, walletConnection }
}

window.nearInitPromise = initializeContract()
  .then(({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <App 
        contract={contract}
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={walletConnection}
      />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
