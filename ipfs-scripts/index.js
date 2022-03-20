const yargs = require('yargs');
const get = require("./utils/get");
const list = require("./utils/list");
const upload = require("./utils/upload");
const near = require("./utils/near");
require('dotenv').config();

const argv = yargs
    .command('getFile', 'Get a specific file from the bucket', {
        key: {
            description: 'key name',
            alias: 'k',
            type: 'string'
        }
    })
    .command('getFileHash', 'Get ipfs hash from a specific file in the bucket', {
        key: {
            description: 'key name',
            alias: 'k',
            type: 'string'
        }
    })
    .command('listFiles', 'List files from the bucket', {
        key: {
            alias: 'k',
            description: 'key name',
            type: 'string'
        }
    })
    .command('uploadFiles', 'Upload Files from a single folder', {
        filepath: {
            alias: 'f',
            description: 'folder filepath',
            type: 'string'
        },
        counts: {
            alias: 'c',
            description: 'Total NFT counts',
            type: 'number'
        },
        name: {
            alias: 'n',
            description: 'Project Name',
            type: 'string'
        }
    })
    .command('set-token-metadata-single', 'Set token metadata of a single token id', {
        filepath: {
            alias: 'f',
            description: 'folder filepath',
            type: 'string'
        },
        token: {
            alias: 't',
            description: 'token id',
            type: 'string'
        },
        contract: {
            alias: 'c',
            description: 'contract address',
            type: 'string'
        },
        logFile: {
            alias: 'l',
            description: 'logfile filepath',
            type: 'string'
        },
        accountId: {
            alias: 'a',
            description: 'near account id for signing transactions',
            type: 'string'
        }
    })
    .command('set-token-metadata', 'Set token metadata of a project', {
        filepath: {
            alias: 'f',
            description: 'folder filepath',
            type: 'string'
        },
        tokenCount: {
            alias: 't',
            description: 'token count',
            type: 'number'
        },
        contract: {
            alias: 'c',
            description: 'contract address',
            type: 'string'
        },
        logFile: {
            alias: 'l',
            description: 'logfile name',
            type: 'string'
        },
        accountId: {
            alias: 'a',
            description: 'near account id for signing transactions',
            type: 'string'
        }
    })
    .command('update-token-metadata-single', 'Update token metadata of a single token id', {
        filepath: {
            alias: 'f',
            description: 'folder filepath',
            type: 'string'
        },
        token: {
            alias: 't',
            description: 'token id',
            type: 'string'
        },
        contract: {
            alias: 'c',
            description: 'contract address',
            type: 'string'
        },
        logFile: {
            alias: 'l',
            description: 'logfile filepath',
            type: 'string'
        },
        accountId: {
            alias: 'a',
            description: 'near account id for signing transactions',
            type: 'string'
        }
    })
    .command('view-token-metadata', 'view token metadata of a single token id', {
        token: {
            alias: 't',
            description: 'token id',
            type: 'string'
        },
        contract: {
            alias: 'c',
            description: 'contract address',
            type: 'string'
        },
        accountId: {
            alias: 'a',
            description: 'near account id for signing transactions',
            type: 'string'
        }
    })
    .help()
    .alias('help', 'h').argv;

if (argv._.includes('getFile')) {
    const key = argv.key
    get.getFile(key);
}

if (argv._.includes('getFileHash')) {
    const key = argv.key
    get.getFileHash(key);
}

if (argv._.includes('listFiles')) {
    const key = argv.key
    console.log(key)
    list.listFiles(key);
}

if (argv._.includes('uploadFiles')) {
    const filepath = argv.filepath
    const counts = argv.counts
    const name = argv.name
    upload.uploadFiles(filepath, counts, name);
}

if (argv._.includes('set-token-metadata-single')) {
    const filepath = argv.filepath
    const token = argv.token
    const contract = argv.contract
    const logFile = argv.logFile
    const accountId = argv.accountId
    near.set_token_metadata_single(filepath, token, logFile, accountId, contract);
}

if (argv._.includes('set-token-metadata')) {
    const filepath = argv.filepath
    const tokenCount = argv.tokenCount
    const contract = argv.contract
    const logFile = argv.logFile
    const accountId = argv.accountId
    near.set_token_metadata(filepath, tokenCount, logFile, accountId, contract);
}

if (argv._.includes('update-token-metadata-single')) {
    const filepath = argv.filepath
    const token = argv.token
    const contract = argv.contract
    const logFile = argv.logFile
    const accountId = argv.accountId
    near.update_token_metadata_single(filepath, token, logFile, accountId, contract);
}

if (argv._.includes('view-token-metadata')) {
    const token = argv.token
    const contract = argv.contract
    const accountId = argv.accountId
    near.view_token_metadata(contract, accountId, token);
}

//console.log(argv);