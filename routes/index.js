const express = require('express')
const router = express.Router()

/* 
let query = "SELECT * FROM `users` ORDER BY id ASC"; // query database to get all the players

// execute query
db.query(query, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('result',result);
});
*/

router.get('/', (req, res, next) => {
    res.json('okok');
});

router.get('/all', (req, res, next) => {
    // let query = "SELECT * FROM `users` ORDER BY id ASC";
    let query = "SELECT COUNT(name) FROM `users`"; // ORDER BY id ASC";
    db_fetch_result(query).then((sub) => {
        console.log(sub);
        res.send(sub);
    }).catch((err) => {
        console.log('Error', err);
    });
    
    // db.query(query, (err, result) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log('result',result);
    //     res.send(result);
    // });
});

router.post('/create', (req, res, next) => {
    console.log(req.body);
    insertQuery(req.body).then((sub) => {
        res.send('Done');
    }).catch((err) => {
        console.log(err);
        res.send('Error');
    });
});

function insertQuery(body) {
    return new Promise((resolve, reject) => {
        let query = "INSERT INTO `users` (name, password, email) VALUES ('"+ body.name +"', '" + body.password + "', '" + body.mail + "')";
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            console.log('result',result);
            resolve(true);
        });
    })
}

function db_fetch_object(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            console.log('query fgetch result',result);
            resolve(result);
        });
    })
}

function db_fetch_result(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            console.log('query fgetch result',result);
            resolve(result);
        });
    });
}

function db_run_query(query) {
    db.query(query, (err, result) => {
        if (err) {
            return err
        }
        console.log('query run successfully',result);
        return true
    });
}

module.exports = router;