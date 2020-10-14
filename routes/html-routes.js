// Exports a function including all routes that return different views
module.exports = function(app) {

    app.get("/", (req, res) => {
        res.render("index");
    });

};