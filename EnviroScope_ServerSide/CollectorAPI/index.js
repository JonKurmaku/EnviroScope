const { express, fs, mysql, path } = require('./dependecies/modules');
const db = require('./dependecies/db_config'); 

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', '..', 'EnviroScope_ClientSide')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

require('./controllers/getController')(app,db); //Render Landing Page
require('./controllers/dbTest')(app,db); //MySQL connection testing


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});