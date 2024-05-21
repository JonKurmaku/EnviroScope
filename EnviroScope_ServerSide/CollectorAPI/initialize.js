const readAndConvertFile = require('./middleware/convertExporter');

function simulateReadings() {
    const inputFilePath = __dirname + '/data.txt';
    const outputFilePath = __dirname + '/output.txt';
    console.log(inputFilePath);
    console.log(outputFilePath);
     
    return readAndConvertFile(inputFilePath, outputFilePath)
        .then(() => {
            console.log('Data written to output file successfully.');
        })
        .catch((err) => {
            console.error('Error:', err);
        });
}

simulateReadings();
