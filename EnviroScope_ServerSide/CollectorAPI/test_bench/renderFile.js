const readAndConvertFile = require('../middleware/convertExporter');
const { fs } = require('../dependecies/modules');
const path = require('path');

const outputFilePath = path.join(__dirname, 'output.txt');
const inputFilePath =path.join(__dirname,'testBits.txt');

readAndConvertFile(inputFilePath,outputFilePath)
    .then(integers => {
        const dataToWrite = integers.join('\n');

        fs.writeFile(outputFilePath, dataToWrite, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Data written to', outputFilePath);
        });
    })
    .catch(err => {
        console.error('Error:', err);
    });
