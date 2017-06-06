const path = require("path");

module.exports = function(app) {
    // Load Home
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "..", "public/home.html"))
    })

    // Load Survey
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "..", "public/survey.html"))
    });
}