const mysql = require("mysql");

// local host
// const connection = mysql.createConnection({
//     port: 3306,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "burgers_db"
// });

// cleardb
const connection = mysql.createConnection({
    //  port: 3306,
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b83ad3f526f307",
    password: "740a0e35",
    database: "heroku_3a2299e3b7bd46e"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;