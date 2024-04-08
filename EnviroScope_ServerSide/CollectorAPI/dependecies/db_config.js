const { mysql } = require('./modules');

const db = mysql.createConnection({
    host: '127.0.0.2',
    port: 3306,  
    user: 'root',
    password: '$_Jon_Xhaxhi_123_@_$',
    database: 'enviro_scope',
});

module.exports = db;
