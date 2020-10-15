$("#usernameInput").on("submit", function (event) {
  event.preventDefault();
  window.location.replace("/createCharacter");
  var newUser = {
    user_name: $("#usernameInput [name=user_name]").val().trim(),
  };
  console.log(newUser);
  //   $.ajax("/api/users", {
  //     type: "POST",
  //     data: newUser,
  //   }).then(function () {
  //     console.log("created new user");
  //   });
});
