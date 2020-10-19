// Module Requirements
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const db = require("./models");
const { router: userRouter } = require("./controllers/userController");
const {
  matchedCharacters: matchedCharacters,
} = require("./controllers/charactersController");
const {
  router: charactersRouter,
} = require("./controllers/charactersController");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
var mysql = require("mysql");
var connection;
const PORT = process.env.PORT || 8080;

app.set("port", PORT);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars setup
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

// HTML ROUTES
// ============================================
// Main page route
app.get("/", (req, res) => {
  res.render("index");
});

app.use(userRouter);
app.use(charactersRouter);

// app.get("/createCharacter", (req, res) => {
//   console.log({currentUser});
//   res.render("createCharacter", {currentUser});
// });

// function usersCharacters(userId) {
//   $.ajax(`/api/characterByUser/${userId}`, {
//     type: "GET",
//     // data: characterList,
//   }).then(function (response) {
//     console.log("characters:", response);

//     return response;

//     // Change to character creator
//     // console.log("generated characters for user id" + response);
//     //console.log(characterList);
//   });
// }

app.get("/allCharacters", (req, res) => {
  res.render("allCharacters", matchedCharacters);
});

app.get("/createCharacter", (req, res) => {
  res.render("createCharacter");
});

app.get("/characterByUser", (req, res) => {
  res.render("allCharacters");
});

app.get("/battle", (req, res) => {
  res.render("battle");
});

// API ROUTES
// ======================================
// Testing route, to be changed later
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// app.get("/api/character/:id", function (req, res) {
//   db.Character.findOne({
//     where: {
//       id: 6,
//     },
//   }).then((matchedCharacter) => {
//     console.log("Found your character");
//     res.json(matchedCharacter);
//   });
//   // .catch((err) => {
//   //   console.log(err);
//   //   res.status(500).json({
//   //     error: true,
//   //     data: null,
//   //     message: "Unable to find character",
//   //   });
//   // });
// });

// db.sequelize.sync({ force: true }).then(function () {

// db.sequelize.sync({}).then(function () {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });

db.sequelize.sync({}).then(function () {
  app.listen(process.env.PORT || 8080, function () {
    console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
    );
  });
});
