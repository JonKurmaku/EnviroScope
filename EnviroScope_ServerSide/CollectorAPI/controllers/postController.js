const db = require("../dependecies/db_config");
const convertedDataPromise = require('../middleware/convertexporter');

async function postDataToDatabase() {
    try {
        const convertedData = await convertedDataPromise; 
      
        const [rows, fields] = await db.execute('INSERT INTO sensor1final (humidity, temperature, checksum) VALUES (?, ?, ?)', [
            convertedData[0], 
            convertedData[1], 
            convertedData[2]  
        ]);

        console.log('Data inserted successfully:',rows);
    } catch (error) {
        console.error('Error:', error);
    }
}

postDataToDatabase();
