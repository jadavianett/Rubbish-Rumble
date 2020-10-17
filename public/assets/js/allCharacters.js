$(document).ready(function () {
  $("#go-battle").click(function () {
    window.location.replace("/battle");
  });
  $(".carousel").carousel();

  $("#selectRacoon").click(function () {
    alert("You selected Raccoon");
  });
  $("#selectPigeon").click(function () {
    alert("You selected Pigeon");
  });
  $("#selectPossom").click(function () {
    alert("You selected Possom");
  });
  $("#selectRat").click(function () {
    alert("You selected Rat");
  });
  $("#selectFox").click(function () {
    alert("You selected Fox");
  });

  function usersCharacters(characterList) {
    $.ajax("/api/characterByUser/1", {
      type: "GET",
      data: characterList,
    }).then(function (response) {
      console.log(response);
      // Change to character creator
      console.log("generated characters for user id" + response);
      console.log(characterList);
    });
  }
  usersCharacters();
});
