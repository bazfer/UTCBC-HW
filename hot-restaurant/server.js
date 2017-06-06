// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// (DATA)
// =============================================================
var tables = [{
    name: "",
    phone: "",
    email: "",
    id: 0
}];

var waiting = [{
    name: "",
    phone: "",
    email: "",
    id: 0
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/reserve.html"))
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/tables.html"))
});

<<<<<<< HEAD
// GET data

app.get("/api/tables", function (req, res) {
    res.json(tables)
})

app.get("/api/waiting", function (req, res) {
    res.json(waiting)
})






/*
// Create New Table - takes in JSON input
=======
app.get("/tables/clear", function(req, res) {
	tables = [];
	console.log(tables);
	waiting = [];
	console.log(waiting);
    res.sendFile(path.join(__dirname, "/tables.html"))
});


// Push to "tables" or "waiting" array - takes in JSON input
>>>>>>> bb8d387bdefa8c56af8ed33dadb0aad849158c10
app.post("/api/new", function(req, res) {
 var table = req.body;
 table.routeName = table.name.replace(/\s+/g, "").toLowerCase();

if (tables.length > 5) {
	console.log("Adding to waitlist.");
	waiting.push(waiting);
	console.log(waiting);
}

else {
	tables.push(table);
	console.log(table);
}

 res.json(table);
});
*/

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
 console.log("App listening on PORT " + PORT);
});