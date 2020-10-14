const express = require("express");
const router = express.Router();
const db = require("../models");

// Views Routes
// ======================================================


// API ROUTES
// ======================================================

// adds a new character based on inputted req.body
router.post("/api/addCharacter", function(req,res) {
    // Creates a new character based on the incoming request
    db.Character.create({
        character_name: req.body.character_name,
        advantage: req.body.advantage,
        avatar_image: req.body.avatar_image,
        wins: req.body.wins,
        losses: req.body.losses,
        hp: req.body.hp,
        atk: req.body.atk,
        def: req.body.def
    }).then(function(newCharacter) {
        // Returns the new character as json
        res.json(newCharacter);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: true,
            data: null,
            message: "Unable to create character",
        });
    });
});

// gets all characters belonging to a certain user id for viewing
router.get("/api/viewCharacters/:id", function(req,res) {
    db.Character.findAll({
        where: {
            user_id: req.params.id
        }
    }).then(matchedCharacters => {
        console.log("Found your characters")
        res.json(matchedCharacters);
    });
});

module.exports = router;
