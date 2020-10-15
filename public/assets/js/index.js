$("#usernameInput").on("submit", function (event) {
  event.preventDefault();
  if ($("#usernameInput").val() == "") {
    return;
  };

  var newUser = {
    user_name: $("#usernameInput [name=user_name]").val().trim(),
  };

  console.log(newUser);
  $.ajax("/api/usersByName", {
  type: "GET",
  data: newUser,
  }).then(function () {
  console.log("created new user");
  });
});
