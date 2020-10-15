const userController = require("../../../controllers/userController.js");

// Makes a search for the user and creates one if no such user exists
function getUserByName() {
  $.ajax("/api/userByName", {
    type: "GET",
    data: newUser,
  }).then(function (response) {
    if (response === null) {
      createNewUser(newUser);
    } else {
      // change to character creator
      window.location.replace("/createCharacter");
    }
  });
};

// Creates a new user based on given name
function createNewUser(userObj) {
  $.ajax("/api/user", {
    type: "POST",
    data: userObj,
  }).then(function(response) {
    // Sets current user to the newly created user
    userController.currentUser = response;
    // Change to character creator
    window.location.replace("/createCharacter");
  });
};

// when submit is clicked, select or create a 'currentUser'
$("#usernameInput").on("submit", function (event) {
  event.preventDefault();

  // Returns automatically if no value was input
  if ($("#usernameInput").val() == "") {
    return;
  };

  // Creates an object out of the given name for use in api calls
  var newUser = {
    user_name: $("#usernameInput [name=user_name]").val().trim(),
  };

  console.log(newUser);

  // Makes a search for the user and creates one if no such user exists
  getUserByName();
});