const db = require("../dependecies/db_config");
const {fs} =require("../dependecies/modules");


async function resetDatabaseTable(db, tableName, tableSchema) {
    try {
        await db.execute(`DROP TABLE IF EXISTS ${tableName}`);
        console.log(`Table ${tableName} dropped successfully.`);

        await db.execute(`CREATE TABLE ${tableName} ${tableSchema}`);
        console.log(`Table ${tableName} created successfully.`);
    } catch (error) {
        console.error(`Error recreating ${tableName} table:`, error);
        throw error;
    }
}


const tableName = 'sensor1final';
const tableSchema = `
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        humidity FLOAT,
        temperature FLOAT,
        checksum FLOAT
    )
`;


const tableName1 = 'sensor1';
const tableSchema1 = `
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_chunk VARCHAR(255),
        second_chunk VARCHAR(255),
        third_chunk VARCHAR(255),
        fourth_chunk VARCHAR(255),
        fifth_chunk VARCHAR(255)
    )
`;

resetDatabaseTable(db, tableName1, tableSchema1)
    .then(() => {
        console.log('Table recreated successfully.');
    })
    .catch(error => {
        console.error('Error recreating table:', error);
    });


    resetDatabaseTable(db, tableName, tableSchema)
    .then(() => {
        console.log('Table recreated successfully.');
    })
    .catch(error => {
        console.error('Error recreating table:', error);
    });
