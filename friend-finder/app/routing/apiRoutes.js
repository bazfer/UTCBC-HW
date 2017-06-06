// Dependencies
// ************************************************************
const path = require("path");
const fs = require('fs');

// Trim Object
// ************************************************************
function trimObj(obj) {
  if (!Array.isArray(obj) && typeof obj != 'object') return obj;
  return Object.keys(obj).reduce(function(acc, key) {
    acc[key.trim()] = typeof obj[key] == 'string'? obj[key].trim() : trimObj(obj[key]);
    return acc;
  }, Array.isArray(obj)? []:{});
}

// Read JSON
// ************************************************************
var stored = fs.readFile(__dirname + "/../data/friends.json", "utf8", function (err, data) {
    if (err) throw err;
    let goodData = trimObj(data)
    stored = JSON.parse(goodData);
});

// Min of Array
// ************************************************************
function getMinOfArray(array) {
    return Math.min.apply(null, array);
}

// Compatibility Logic
// ************************************************************
function calcCompa(stored, person) {
    let deltas = [];
    let newRecord = person;
    let values = stored
        .map(record => record.scores)
        .filter(record => record != undefined)
        .forEach(record => record
            .reduce((delta, elem, index) => {
                console.log("d = " + delta + ", e = " + elem + ", p = " + newRecord.answers[index] + " , i = " + index);
                delta = delta + (Math.abs(newRecord.answers[index] - elem));
                if(index == (newRecord.answers.length-1))
                    deltas.push(delta);
                return(delta)}, 
            0)
        )
        console.log(deltas)
    let minVal = getMinOfArray(deltas);
    return deltas.indexOf(minVal);
}

// Routes
// ************************************************************
module.exports = function (app) {
    // display json data
    app.get("/api/friends", function (req, res) {
        res.json(stored);
    });
    // capture survey data and handle compatibility logic
    app.post("/api/new", function (req, res) {
        let person = req.body;
        // rewrite JSON
        stored.push(person);
        toStore = JSON.stringify(stored);
        fs.writeFile(__dirname + "/../data/friends.json", toStore, function(err){
            if (err) throw err;
            console.log("saved!");
        });
        // callback
        let toDisplay = calcCompa(stored, person);
        
        res.json(stored[toDisplay]);
    });

}