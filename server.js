// Module Requirements
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const db = require("./models");
const {router: userRouter} = require("./controllers/userController");
const charactersController = require("./controllers/charactersController");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// HTML ROUTES
// ============================================
// Main page route
app.get("/", (req, res) => {
  res.render("index");
});
app.use(userRouter);
app.use(charactersController);

app.get("/createCharacter", (req, res) => {
  res.render("createCharacter");
});

app.get("/allCharacters", (req, res) => {
  res.render("allCharacters");
});

// API ROUTES
// ======================================
// Testing route, to be changed later
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

//db.sequelize.sync().then(function () {
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//});
