import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import { fs } from 'fs'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['get_greeting'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['set_greeting'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn('')
}

export async function testDeploy() {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  
  const config = {
    networkId: "testnet",
    keyStore, // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  
  const near = await connect(config);

  console.log(near)

  const account = await near.account("thawalk.testnet");

  console.log(account)

  console.log(keyStore)

  let data = await fetch('../out/main.wasm');
  let buf = await data.arrayBuffer();
  // const response = await account.deployContract(new Uint8Array(buf));
  // const response = await account.deployContract(fs.readFileSync('../out/main.wasm'));
  // console.log(response);

  console.log("adding key...")

  fullKey = await account.addKey("ed25519:WLczScSp5BVTi6n38DgwRNWnKgsKGY9MRNUd43qD4G2");

  console.log(fullKey)

  const keys = await account.getAccessKeys();
  console.log(keys)
}