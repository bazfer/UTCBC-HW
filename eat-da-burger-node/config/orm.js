const connection = require("../config/connection.js");

// helper functions may go here

var orm = {
    all: function(table, cb) {
        let queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insert: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table + " (" + cols + ", devoured) VALUE('" + vals + "', 0);";
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    update: function(table, condition, cb) {
        let queryString = "UPDATE " + table + " SET devoured = 1 WHERE " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};

module.exports = orm;

//INSERT INTO burgers (burger_name, devoured) value("Jackson's Nightmare", 0);

//UPDATE burgers SET devoured = 1 WHERE burger_name = "Kanuk";