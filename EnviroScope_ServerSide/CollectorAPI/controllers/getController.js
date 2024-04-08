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
        db.execute('SELECT * FROM sensor1final WHERE id = 1', function(err, [rows, fields]) {
                if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ error: 'No data found for ID 1' });
            }
           
            const { temperature, humidity } = rows;

            console.log('Temperature:', temperature);
            console.log('Humidity:', humidity);

            res.json({
                temperature,
                humidity
            });
        });
            
    });
    
    
    
};
