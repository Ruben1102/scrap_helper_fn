const mysql = require('mysql');

// Create user on mysql with "test" DB access 
// and give privilage with any ip on test DB only

/* Create table
    CREATE TABLE IF NOT EXISTS `players` (
        `id` int(5) NOT NULL AUTO_INCREMENT,
        `first_name` varchar(255) NOT NULL,
        `last_name` varchar(255) NOT NULL,
        `position` varchar(255) NOT NULL,
        `number` int(11) NOT NULL,
        `image` varchar(255) NOT NULL,
        `user_name` varchar(20) NOT NULL,
        `created_on` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    )

    ALTER TABLE bookmarks ADD `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    ALTER TABLE bookmarks DROP COLUMN created_on;
*/

/* 
CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'remotepass';

Grant All Privileges ON test.* to 'remoteuser'@'%' Identified By 'remotepass';

FLUSH PRIVILEGES;

*/



// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'host_name',
    user: 'username',
    password: 'pass',
    database: 'db_name'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');

    let query = "SELECT * FROM `users` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            console.log('result',result);
        });
        
    db.end();
});