const express = require("express");
const router = express.Router();
const db = require("../models");

// Views Routes
// ======================================================


// API ROUTES
// ======================================================
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
        console.log(newCharacter);
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

module.exports = router;
