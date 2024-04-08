const { fs } = require('../dependecies/modules');
const convertBitsToIntegers = require('./bitconverter');
const filePath = '../CollectorApi/test_bench/testBits.txt';

function readAndConvertFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf8' })
            .then(data => {
                const convertedData = convertBitsToIntegers(data);
                console.log(convertedData);
                resolve(convertedData);
            })
            .catch(err => {
                console.error('Error reading file:', err);
                reject(err);
            });
    });
}

module.exports = readAndConvertFile();
