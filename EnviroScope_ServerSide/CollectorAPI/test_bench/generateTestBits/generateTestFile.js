const fs =require('fs');

function generateRandomBitString(n) {
    let bitString = '';
    for (let i = 0; i < n; i++) {
        bitString += Math.random() < 0.5 ? '0' : '1';
    }
    return bitString;
}

function writeRandomBitStringToFile(filePath, numRows) {
    return new Promise((resolve, reject) => {
        let content = ''; 
        for (let i = 0; i < numRows; i++) {
            const randomString = generateRandomBitString(40);
            content += randomString + '\n'; 
        }
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                reject(err);
            } else {
                console.log('Text file created successfully.');
                resolve();
            }
        });
    });
}




module.exports = writeRandomBitStringToFile;