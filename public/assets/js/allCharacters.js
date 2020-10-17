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

  function usersCharacters() {
    $.ajax("/api/characterByUser/1", {
      type: "GET",
    }).then(function (response) {
      console.log(response);
      let characterNames = response.map(function (value) {
        return value.character_name;
      });
      console.log(characterNames);
    });
  }
  usersCharacters();
});
