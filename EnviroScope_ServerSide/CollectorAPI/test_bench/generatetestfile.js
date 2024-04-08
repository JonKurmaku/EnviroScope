const { fs } = require('../dependecies/modules');

function generateRandomString(length) {
    let binaryString = '';
    for (let i = 0; i < length; i++) {
      const randomBit = Math.round(Math.random());
      binaryString += randomBit.toString();
    }
    return binaryString;
  }
  
  const filePath = 'test_bench/testBits.txt';
  
  const randomString = generateRandomString(40);
  
  const content = randomString;
  
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Text file created successfully.');
  });