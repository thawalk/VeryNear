const fleekStorage = require('@fleekhq/fleek-storage-js')
require('dotenv').config();


async function getFile(key) {
    const myFile = await fleekStorage.get({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        key: key,
        getOptions: [
            'data',
            'bucket',
            'key',
            'hash',
            'publicUrl'
        ],
    })

    console.log(myFile)
    console.log(myFile.hash)
}

async function getFileHash(key) {
    const myFile = await fleekStorage.get({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        key: key,
        getOptions: [
            'hash',
        ],
    })
    console.log(myFile.hash)
}

module.exports = { getFile, getFileHash };