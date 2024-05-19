const writeRandomBitStringToFile = require('./generateTestBits/generateTestFile');
const readAndConvertFile = require('../middleware/convertExporter');

function simulateReadings() {
    const inputFilePath = __dirname + '/input.txt';
    const outputFilePath = __dirname + '/output.txt';
    console.log(inputFilePath);
    console.log(outputFilePath);
    return writeRandomBitStringToFile(inputFilePath, 40)
        .then(() => {
            return readAndConvertFile(inputFilePath, outputFilePath);
        })
        .then(() => {
            console.log('Data written to output file successfully.');
        })
        .catch((err) => {
            console.error('Error:', err);
        });
}

simulateReadings();

module.exports = simulateReadings;
