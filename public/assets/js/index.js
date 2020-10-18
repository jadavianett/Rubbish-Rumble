// Makes a search for the user and creates one if no such user exists
function getUserByName(newUser) {
  $.ajax("/api/userByName/" + newUser.user_name, {
    type: "GET",
  }).then(function (response) {
    console.log(response);
    if (response === null) {
      createNewUser(newUser);
    } else {
      // change to character creator
      sessionStorage.setItem("currentUser", response.id);
      console.log("Found User: " + response);
      window.location.replace("/AllCharacters");
    }
  });
}

// Creates a new user based on given name
function createNewUser(userObj) {
  $.ajax("/api/user", {
    type: "POST",
    data: userObj,
  }).then(function (response) {
    // Change to character creator

    sessionStorage.setItem("currentUser", response.id);
    window.location.replace("/AllCharacters");
    console.log("Added new User: " + response);
    console.log(response);
  });
}

// when submit is clicked, select or create a 'currentUser'
$("#usernameInput").on("submit", function (event) {
  event.preventDefault();

  // Returns automatically if no value was input
  if ($("#usernameInput [name=user_name]").val() == "") {
    console.log("returning due to empty field");
    return;
  }

  // Creates an object out of the given name for use in api calls
  var newUser = {
    user_name: $("#usernameInput [name=user_name]").val().trim(),
  };

  console.log(newUser);

  // Makes a search for the user and creates one if no such user exists
  getUserByName(newUser);
});
