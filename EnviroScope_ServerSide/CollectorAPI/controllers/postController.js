const db = require("../dependecies/db_config");
const { fs , timers } = require("../dependecies/modules");
const setInterval = timers.setInterval;
const path = require('path');

async function postDataToDatabaseValues(filePath, db) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const rows = data.trim().split('\n');

        for (const row of rows) {
            const [temperature, humidity, checksum] = row.trim().split(' ');
            console.log("H:"+humidity," T:"+temperature+" CH:"+checksum)
            const result = await db.execute('INSERT INTO sensor1final (humidity, temperature, checksum) VALUES (?, ?, ?)', [
                humidity,
                temperature,
                checksum
            ]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function postDataToDatabaseBits(filePath, db) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const rows = data.trim().split('\n');

        for (const row of rows) {
            const segments = row.trim().match(/.{1,8}/g);
            if (segments.length !== 5) {
                console.error('Each row should contain exactly 40 bits');
                continue;
            }

            const [humidity, humidityFP, temperature, temperatureFP, checksum] = segments;

            const result = await db.execute('INSERT INTO sensor1 (first_chunk, second_chunk, third_chunk, fourth_chunk, fifth_chunk) VALUES (?, ?, ?, ?, ?)', [
                humidity,
                humidityFP,
                temperature,
                temperatureFP,
                checksum
            ]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function startDataPosting(db) {
    const inFilePath = './test_bench/input.txt';
    postDataToDatabaseBits(inFilePath, db);

    const outfilePath = './test_bench/output.txt';
    postDataToDatabaseValues(outfilePath, db);
}

module.exports = startDataPosting;
