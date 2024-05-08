const fs  = require('fs');

function calculateChecksum(bits) {
    const chunks = bits.match(/.{1,8}/g);
    const sum = chunks.slice(0, 4).reduce((acc, chunk) => acc + parseInt(chunk, 2), 0);
    const checksum = (sum % 256).toString(2).padStart(8, '0');
    
    return checksum;
}

function verifyChecksum(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    
    data.forEach(row => {
        const bits = row.trim();
        const dataBits = bits.slice(0, 32);
        const checksumBits = bits.slice(32);
        
        const calculatedChecksum = calculateChecksum(dataBits);
        
        if (calculatedChecksum === checksumBits) {
            console.log("Checksum verified for row: " + bits);
        } else {
            console.log("Checksum verification failed for row: " + bits);
        }
    });
}

module.exports = verifyChecksum;