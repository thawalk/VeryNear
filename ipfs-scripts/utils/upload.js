const fleekStorage = require('@fleekhq/fleek-storage-js')
const fs = require('fs');
require('dotenv').config();


async function uploadFiles(filePath, counts, name) {
    const logFilePath = "./result/" + name + ".txt"
    let i = 0

    setInterval(function(){
        if(i < counts){
            uploadFile(filePath, i, name, logFilePath)
            i++;
        }
        else{
            console.log("Done! Hash Log File can be found at: " + logFilePath)
        }
    }, 1000)
    
}

function uploadFile(filePath, i, name, logFilePath){
    const imageKey = `${i}.png`
    const jsonKey = `${i}.json`

    let imageFilePath = filePath + imageKey
    let jsonFilePath = filePath + jsonKey

    const fileBaseKey = name + "/"
    let imageFileKey = fileBaseKey + imageKey
    let jsonFileKey = fileBaseKey + jsonKey
    //console.log(imageKey)
    //console.log(jsonKey)
    //console.log(imageFilePath)
    //console.log(imageFileKey)
    //console.log(jsonFilePath)
    //console.log(jsonFileKey)

    fs.readFile(imageFilePath, async (error, fileData) => {
        const uploadedImageFile = await fleekStorage.upload({
            apiKey: process.env.API_KEY,
            apiSecret: process.env.API_SECRET,
            key: imageFileKey,
            ContentType: 'image/png',
            data: fileData,
            httpUploadProgressCallback: (event) => {
                console.log(Math.round(event.loaded / event.total * 100) + '% done');
            }
        });

        //console.log(uploadedImageFile);

        const uploadedImageHash = uploadedImageFile.hashV0;
        console.log("Image Hash: " + uploadedImageHash)

        const fileName = jsonFilePath;
        const file = require("." + fileName);
        file.image = uploadedImageHash;

        fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            //console.log(JSON.stringify(file, null, 2));
            //console.log('writing to ' + fileName);

            fs.readFile(jsonFilePath, async (error, fileData) => {
                const uploadedJsonFile = await fleekStorage.upload({
                    apiKey: process.env.API_KEY,
                    apiSecret: process.env.API_SECRET,
                    key: jsonFileKey,
                    ContentType: 'application/json',
                    data: fileData,
                    httpUploadProgressCallback: (event) => {
                        console.log(Math.round(event.loaded / event.total * 100) + '% done');
                    }
                });
                const uploadedJsonHash = uploadedJsonFile.hashV0
                console.log("Json Hash: " + uploadedJsonHash);

                writeIpfs(logFilePath, uploadedImageHash, uploadedJsonHash)
            })
        });
    })
}

// Outputs Image Hash then Json Hash on the same line for each item
function writeIpfs(logFilePath, imageHash, jsonHash) {
    var stream = fs.createWriteStream(logFilePath, { flags: 'a' });
    stream.write(imageHash + " " + jsonHash + "\n");
    stream.end();
}

module.exports = { uploadFiles };