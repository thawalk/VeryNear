var cp = require('child_process');
const fs = require('fs');

async function set_token_metadata(folder, tokenCount, logFile, accountId, contract) {
    const hashArray = gethashArray(logFile)
    for (i = 0; i < tokenCount; i++) {
        await set_token_metadata_single_with_hashArray(folder, i, hashArray, accountId, contract)
    }
}

function set_token_metadata_single(folder, tokenId, logFile, accountId, contract) {
    const jsonFile = folder + "/" + tokenId + ".json"
    const hashArray = gethashArray(logFile)

    let metadataString = getMetadataString(jsonFile, hashArray, tokenId)
    set_token_metadata_call(accountId, contract, tokenId, metadataString)
}

async function set_token_metadata_single_with_hashArray(folder, tokenId, hashArray, accountId, contract) {
    const jsonFile = folder + "/" + tokenId + ".json"

    let metadataString = getMetadataString(jsonFile, hashArray, tokenId)
    set_token_metadata_call(accountId, contract, tokenId, metadataString)
}

function update_token_metadata_single(folder, tokenId, logFile, accountId, contract) {
    const jsonFile = folder + "/" + tokenId + ".json"
    const hashArray = gethashArray(logFile)

    let metadataString = getMetadataString(jsonFile, hashArray, tokenId)
    update_token_metadata_call(accountId, contract, tokenId, metadataString)
}

function view_token_metadata(contract, accountId, token) {
    view_token_metadata_call(contract, accountId, token)
}

function set_token_metadata_call(accountId, contract, tokenId, metadataString) {
    const child = cp.spawn('./near-scripts/set-token-metadata.sh', [accountId, contract, tokenId, metadataString]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
}

function update_token_metadata_call(accountId, contract, tokenId, metadataString) {
    const child = cp.spawn('./near-scripts/update-token-metadata.sh', [accountId, contract, tokenId, metadataString]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
}

function view_token_metadata_call(contract, accountId, tokenId) {
    const child = cp.spawn('./near-scripts/view-token-metadata.sh', [contract, accountId, tokenId]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
}

function getMetadataString(jsonFile, hashArray, tokenId) {
    let jsonBuffer = fs.readFileSync(jsonFile)
    let data = JSON.parse(jsonBuffer);

    let metadata = {
        title: data.title,
        media: hashArray[parseInt(tokenId)].imageHash,
        reference: hashArray[parseInt(tokenId)].jsonHash,
        copies: 1,
        issued_at: Date.now()
    }

    return JSON.stringify(metadata)
}

function gethashArray(logFile) {
    const logFilePath = "./result/" + logFile + ".txt"

    const allFileContents = fs.readFileSync(logFilePath, 'utf-8');
    const hashArray = allFileContents.split(/\r?\n/).map(line => {
        lineArray = line.split(" ")
        return {
            "imageHash": lineArray[0],
            "jsonHash": lineArray[1],
        }
    });

    return hashArray
}

module.exports = { set_token_metadata, set_token_metadata_single, update_token_metadata_single, view_token_metadata };