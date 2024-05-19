const fs  = require('fs');

const filteredInput=[];

function calculateChecksum(bits) {
    const chunks = bits.match(/.{1,8}/g);
    const sum = chunks.slice(0, 4).reduce((acc, chunk) => acc + parseInt(chunk, 2), 0);
    const checksum = (sum % 256).toString(2).padStart(8, '0');
    
    return checksum;
}

function verifyChecksum(content) {
    const data = content.trim().split('\n');
    data.forEach(row => {
        const bits = row.trim();
        const dataBits = bits.slice(0, 32);
        const checksumBits = bits.slice(32);
        
        const calculatedChecksum = calculateChecksum(dataBits);
        
        if (calculatedChecksum === checksumBits) {
            filteredInput.push(bits);
            console.log("Checksum verified for row: " + bits);
        } else {
            console.log("Checksum verification failed for row: " + bits);
        }
    });

    return filteredInput;
}

module.exports = verifyChecksum;