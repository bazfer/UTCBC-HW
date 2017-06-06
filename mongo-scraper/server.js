// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const request = require("request");
const cheerio = require("cheerio");

// APP SETUP
const PORT = process.env.PORT || 8000;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// DB SETUP
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_4mndt0fx:t8pg6snbn99vari2i1ar3p5cfv@ds139430.mlab.com:39430/heroku_4mndt0fx");
const db = mongoose.connection;
db.on("error", (error) => {
    console.log("Mongoose Error: ", error);
});
db.once("open", () => {
    console.log("Mongoose connection successful.");
});

// ATTACH HANDLEBARS
app.engine('handlebars', exphbs({ defaultLayout: 'main.handlebars' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

// ROUTES
// LANDING
app.get('/', (req, res) => {
    Article.find({}, (error, doc) => {
        let hsbObj = {
            articles: doc
        };
        if (error) {
            console.log(error);
        } else {
            res.render('index', hsbObj);
        }
    });
});

// SCRAPE
app.get("/scrape", (req, res) => {
    request("https://news.ycombinator.com/", (error, response, html) => {
        let $ = cheerio.load(html);
        $("td[class=title]").each(function(i, element) {
            let result = {};
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            if (result.title != "More") {
                let entry = new Article(result);
                entry.save((err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });
            }
        });
    });
    res.send("Scrape Complete");
});

// GET ALL ARTICLES - JSON
app.get("/articles", (req, res) => {
    Article.find({}, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

// GET ONE ARTICLE
app.get('/articles/:id', (req, res) => {
    Article.findOne({ "_id": req.params.id })
        .populate('notes')
        .exec((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

// CREATE NOTE
app.post('/articles/:id', (req, res) => {
    var newNote = new Note(req.body);
    newNote.save((error, doc) => {
        if (error) {
            console.log(error);
        } else {
            Article.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'notes': doc._id } }, { new: true })
                .populate('notes')
                .exec((error, doc) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});

// DELETE NOTE
app.delete('/articles/:id', (req, res) => {
    Note.remove({ '_id': req.params.id }, (error, doc) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            Article.findOne({ '_id': req.body.parent })
                .populate('notes')
                .exec((error, doc) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});

// DELETE ARTICLES
app.delete('/articles', (req, res) => {
    Article.remove({ '_id': req.body.id }, (error, doc) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            Article.find({}, (error, doc) => {
                console.log(doc);
                let hsbObj = {
                    articles: doc
                };
                if (error) {
                    console.log(error);
                } else {
                    res.render('index', hsbObj);
                }
            });
        }
    });
});

// OBSERVER
app.listen(PORT, function() {
    console.log("App running on port 8000!");
});