const express = require("express");
const router = express.Router();
const db = require("../models");

//currentUser variable for storing the user who is currently 'logged in'
var currentUser;

// Views Routes
// ======================================================
router.get("/createCharacter", (req, res) => {
  console.log({ currentUser });
  res.render("createCharacter", { currentUser });
});

// API ROUTES
// ======================================================

// adds a new user given a name input
router.post("/api/user", function (req, res) {
  db.User.create({
    user_name: req.body.user_name,
  })
    .then(function (newUser) {
      //Updates currentuser and responds with the new user
      currentUser = newUser;
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new user",
      });
    });
});

// Sets the current user value to the selected user for use in other files
router.get("/api/user/:id", function (req, res) {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(function (foundUser) {
      res.json(foundUser);
      currentUser = foundUser;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to find user",
      });
    });
});

// Sets the current user value to the selected user for use in other files
// searches by name
router.get("/api/userByName/:name", function (req, res) {
  db.User.findOne({
    where: {
      user_name: req.params.name,
    },
  })
    .then(function (foundUser) {
      currentUser = foundUser;
      res.json(foundUser);
      // res.render("createCharacter", {currentUser: foundUser});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to find user",
      });
    });
});

module.exports = {
  router: router,
  currentUser: currentUser,
};
