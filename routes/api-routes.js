// Requires models to interact with sequelize
const db = require("../models");

// Exports all api routes
module.exports = function(app) {

    app.post("/api/addCharacter", function(req,res) {
        // Creates a new character based on the incoming request
        db.Character.create({
            character_name: req.body.character_name,
            advantage: req.body.advantage,
            avatar_image: req.body.avatar_image,
            wins: req.body.wins,
            losses: req.body.losses,
            user_id: req.body.user_id
        }).then(function(newCharacter) {
            // Returns the new character as json
            res.json(newCharacter);
        });
    });

};