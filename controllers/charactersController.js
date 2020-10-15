const express = require("express");
const router = express.Router();
const db = require("../models");

// Views Routes
// ======================================================


// API ROUTES
// ======================================================

// adds a new character based on inputted req.body
router.post("/api/character", function(req,res) {
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
router.get("/api/character/:id", function(req,res) {
    db.Character.findAll({
        where: {
            user_id: req.params.id
        }
    }).then(matchedCharacters => {
        console.log("Found your characters")
        res.json(matchedCharacters);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: true,
            data: null,
            message: "Unable to find characters",
        });
    });
});

// deletes a chracter that has a certain id
router.delete("/api/character/:id", function(req,res) {
    db.Character.destroy({
        where: {
            id: req.params.id
        }
    }).then(deletedCharacter => {
        console.log("deleted character successfully"); 
        res.end();
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: true,
            data: null,
            message: "Unable to delete",
        });
    });
});


// updates a character with a certain id
router.put("/api/character/:id", function(req,res) {
    db.Character.findOner({
        where: {
            id: req.params.id
        }
    }).then((characterToUpdate) => {
        console.log("Updating character")
        // Updates the character's name, stats, and win/loss record, then saves it
        characterToUpdate.character_name = req.body.character_name;
        characterToUpdate.hp = req.body.hp;
        characterToUpdate.atk = req.body.atk;
        characterToUpdate.def = req.body.def;
        characterToUpdate.wins = req.body.wins;
        characterToUpdate.losses = req.body.losses;
        characterToUpdate.save();
    });
});

module.exports = router;
