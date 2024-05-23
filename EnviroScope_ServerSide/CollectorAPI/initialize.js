const readAndConvertFile = require('./middleware/convertExporter');

function simulateReadings() {
    const inputFilePath = 'C:/Users/Joni/Documents/GitHub/EnviroScope/EnviroScope_ServerSide/CollectorAPI/data.txt';
    const outputFilePath = 'C:/Users/Joni/Documents/GitHub/EnviroScope/EnviroScope_ServerSide/CollectorAPI/output.txt';
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

simulateReadings()
module.exports=simulateReadings