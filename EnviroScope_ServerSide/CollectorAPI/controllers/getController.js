const { fs, path } = require('../dependecies/modules');
const db = require('../dependecies/db_config');

module.exports = function (app) {
    app.get('/', async (req, res) => {
        try {
            const indexPath = path.join(__dirname, '..', '..', '..', 'EnviroScope_ClientSide', 'index.html');
            res.sendFile(indexPath);
        } catch (error) {
            console.error('Error rendering landing page:', error);
            res.status(500).send('Internal server error');
        }
    });
        app.get('/current-values', async (req, res) => {
            db.execute('SELECT AVG(temperature) AS avgTemperature, AVG(humidity) AS avgHumidity FROM sensor1final', function(err, result) {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
        
                const avgHumidity = result[0].avgHumidity; 
                const avgTemperature = result[0].avgTemperature; 
        
                console.log('Average Temperature:', avgTemperature);
                console.log('Average Humidity:', avgHumidity);
        
                res.json({
                    avgTemperature,
                    avgHumidity
                });
            });    
        });    
   
};



