module.exports = function (app,db) {
    app.get('/db-test', (req, res) => {
        db.connect((err) => {
            if (err) {
                res.send('Error :: MySQL');
            }
            res.send('Connected :: MySQL');
        });
    });
    
};

