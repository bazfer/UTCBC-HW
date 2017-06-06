const orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        });
    },
    insert: function(col, val, cb) {
        orm.insert("burgers", col, val, function(res) {
            cb(res);
        });
    },
    update: function(condition, cb) {
        orm.update("burgers", condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;