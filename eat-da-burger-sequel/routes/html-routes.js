// Dependencies
// =============================================================

const db = require("../models");

// Routes
// =============================================================
module.exports = app => {

    // show all burgers
    app.get("/", (req, res) => {
        db.Burger.findAll({}).then(dbBurger => {
            let hbsObj = {
                burgers: dbBurger
            };
            res.render("index", hbsObj);
        });
    });

    // create burger
    app.post("/", (req, res) => {
        db.Burger.create(req.body).then(dbBurger => {
            res.redirect("/");
        });
    });

    // update burger
    app.put("/:id", (req, res) => {
        console.log(req.params.id);
        db.Burger.update({ devoured: true }, { where: { id: req.params.id } }).then(function() {
            console.log("hello");
            res.redirect("/");
        });
    });
};