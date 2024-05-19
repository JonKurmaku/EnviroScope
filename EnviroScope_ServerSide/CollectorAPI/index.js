const { express, fs, mysql, path ,timers} = require('./dependecies/modules');
const db = require('./dependecies/db_config'); 
const startDataPosting = require('./controllers/postController');
const simulateReadings = require('./test_bench/renderFile');
const setInterval = timers.setInterval;
const setTimeout = timers.setTimeout;
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
setInterval(()=>{
simulateReadings() //TEST DATA 
console.log("Files Successful");
setTimeout(()=>startDataPosting(db),2000);  //Simulate Readings 
console.log("POST Successful");
},62000)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});