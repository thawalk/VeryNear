# IPFS Scripts

## Instructions

### Set Environment Variables

Set API_KEY and API_SECRET in `.env`.

### Call scripts only via base folder

#### Upload Files

##### Uploads the Image and Json files into ipfs and outputs the hashes into a file

Node.js

```nodejs
node index.js uploadFiles -f ./data/demo/ -c 5 -n Not-BAYC
```

Bash

```bash
./scripts/uploadFiles.sh ./data/demo/ 5 Not-BAYC
```

#### Set Token Metadata for Project

##### Set the token metadata for an entire project in the deployed smart contract

Node.js

```nodejs
node index.js set-token-metadata -f ./data/demo/ -t 5 -c nft-example.not-bayc.testnet -l Not-BAYC -a not-bayc.testnet
```

Bash

```bash
./scripts/set-token-metadata.sh ./data/demo/ 5 Not-BAYC not-bayc.testnet nft-example.not-bayc.testnet
```

#### View metadata for a single token id

##### View a single token metadata in the deployed smart contract (if exists)

Node.js

```nodejs
node index.js view-token-metadata -t 0 -c nft-example.not-bayc.testnet -a not-bayc.testnet
```

Bash

```bash
./scripts/view-token-metadata.sh nft-example.not-bayc.testnet not-bayc.testnet 0
```
