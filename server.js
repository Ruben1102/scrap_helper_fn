const express = require('express')
const app = express()
const mysql = require('mysql');
const index_route = require('./routes/index')
const bookmar_route = require('./routes/bookmark')
const port = 3000

app.use(express.json())

const down = require('./downloader')

app.use('/', index_route);
app.use('/bookmark', bookmar_route);

// DB Connection
const db = mysql.createConnection ({
    host: 'host_name',
    user: 'user',
    password: 'pass',
    database: 'db_name'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    global.db = db;
    // db.end();
});

console.log(db.state);

/* app.get('/', (req, res) => res.send('Hello World!'))

app.post('/getsong', function (req, res) {
    let body = req.body;
    let res_data = down.download(body.url, body.title, res);
    // res.send(res_data);
});

app.post('/addbkmark', function (req, res) {
    let body = req.body;
    let res_data = down.download(body.url, body.title, res);
    // res.send(res_data);
}); */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))