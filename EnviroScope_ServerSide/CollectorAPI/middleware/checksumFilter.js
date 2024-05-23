const fs  = require('fs');
const crc = require('crc');

const filteredInput=[];

function calculateChecksum(bitstring) {
    console.log("Bitstring:", bitstring);
    const bitstringToProcess = bitstring.slice(0, -8);
    const byteChunks = bitstringToProcess.match(/.{1,8}/g);
    console.log("Byte chunks:", byteChunks);
    const byteArray = Buffer.from(byteChunks.map(byte => parseInt(byte, 2)));
    console.log("Byte array:", byteArray);
    const checksum = crc.crc32(byteArray) & 0xFF;
    console.log("Calculated Checksum:", checksum);
    return checksum;
}

function verifyChecksum(content) {
    const data = content.trim().split('\n');
    data.forEach(row => {
        const bits = row.trim();
        const dataBits = bits.slice(0, 32);
        const checksumBits = bits.slice(32 ,40);
        
        const calculatedChecksum = calculateChecksum(dataBits);
        console.log("32: "+dataBits+ " Calculated Cheksum: "+calculatedChecksum+" Actual Cheksum: "+checksumBits )
        if (calculatedChecksum === parseInt(checksumBits,2)) {
            filteredInput.push(bits);
            console.log("Checksum verified for row: " + bits);
        } else {
            console.log("Checksum verification failed for row: " + bits);
        }
    });

    return filteredInput;
}

module.exports = verifyChecksum;