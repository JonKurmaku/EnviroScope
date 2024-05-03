const {path}=require('../dependecies/modules');
const fs  = require('fs');
const convertBitsToIntegers = require('./bitConverter');

function readAndConvertFile(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputFilePath, 'utf8', (err, content) => {
            if (err) {
                reject(err);
                return;
            }
            const integers = convertBitsToIntegers(content);
            resolve(integers);
        });
    })
    .then(integers => {
        const dataToWrite = integers.reduce((acc, curr, index) => {
            if (index % 3 === 0 && index !== 0) {
                return acc + '\n' + curr;
            } else {
                return acc + ' ' + curr;
            }
        }, '');

        return new Promise((resolve, reject) => {
            fs.writeFile(outputFilePath, dataToWrite, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    })
    .catch(err => {
        console.error('Error:', err);
    });
}


const inputFilePath = './test_bench/input.txt';
const outputFilePath = './test_bench/output.txt';
readAndConvertFile(inputFilePath,outputFilePath)
module.exports=readAndConvertFile;