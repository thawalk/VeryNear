# VeryNear - A NFT Launchpad on the NEAR Protocol

![Home Page Screenshot](https://i.imgur.com/Y9Cc6Xf.jpg)

You can view the demo of the application here: <https://youtu.be/yu3YJWRgtPw>

You can view the slide deck regading this project here: https://docs.google.com/presentation/d/1-Z0LsOT9v0ru1i_zTkUEZIljYrsm730bRdfQk9pz92k/edit?usp=sharing

Front-end of the application is built using React and the backend is NEAR Smart Contracts built using Rust.

[Click here to view other screenshots of our application!](#Screenshots)

## Prerequisites

* [NEAR Wallet Account](wallet.testnet.near.org)
* [Rust Toolchain](https://docs.near.org/docs/develop/contracts/rust/intro#installing-the-rust-toolchain)
* [NEAR-CLI](https://docs.near.org/docs/tools/near-cli#setup)
* [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

## Installation & Set Up for Contracts

```bash
cd contracts
```

### Example

1. Create Account

```bash
./scripts/create-account.sh your-account.testnet
```

2. Deploy Contract

```bash
./scripts/deploy.sh nft.your-account.testnet
```

3. Initialize Default Contract

```bash
./scripts/initialise-default-contract.sh nft.your-account.testnet your-account.testnet
```

## Installation & Set Up for Front-end

Node Version Used: v14.17.3
NPM Version Used: 8.3.2

### Download this repository

```bash
git clone https://github.com/thawalk/VeryNear.git
cd VeryNear
```

### Running the Front-end

The Front-end application (which is built with React.js) is located under the src folder in the directory.

1. Install dependencies

```bash  
npm install
```

2. Start application

```bash  
npm run dev
```

## Screenshots

### Homepage

![HomePage](https://i.imgur.com/9fnsx35.jpg)

### Create Page

![CreatePage](https://i.imgur.com/YxKKKOB.png)

### Minting Page

![MintPage](https://i.imgur.com/Rq0gLDD.jpg)

## Team Members

* [Tharun Adhi Narayan](https://github.com/thawalk)
* [Lee Jia Le](https://github.com/cre8tion)
* [David Fan](https://github.com/deadXdrake)
