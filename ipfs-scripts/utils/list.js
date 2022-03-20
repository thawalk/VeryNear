const fleekStorage = require('@fleekhq/fleek-storage-js')
require('dotenv').config();

async function listFiles(key) {
    const files = await fleekStorage.listFiles({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
        bucket: "1db089d0-4972-42b6-b296-40694c11c53d-bucket",
        prefix: key,
        getOptions: [
            'bucket',
            'key',
            'hash',
            'publicUrl'
        ],
    })

    console.log(files)
}

async function listBuckets() {
    const buckets = await fleekStorage.listBuckets({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET,
    })

    console.log(buckets)
}

module.exports = { listFiles };