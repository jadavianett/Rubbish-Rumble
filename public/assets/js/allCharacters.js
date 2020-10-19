$(document).ready(function () {
  $("#go-battle").click(function () {
    window.location.replace("/battle");
  });

  $("#createCharacter").click(function () {
    window.location.replace("/createCharacter");
  });

  $(".carousel").carousel();

  let userId = sessionStorage.getItem("currentUser");

  $.ajax("/api/characterByUser/" + userId, {
    type: "GET",
  }).then(function (response) {
    var len = response.length;
    for (var i = 0; i < len; i++) {
      var name = response[i].character_name;
      var advantage = response[i].advantage;
      var avatar = response[i].avatar_image;
      var wins = response[i].wins;
      var losses = response[i].losses;
      var hp = response[i].hp;
      var atk = response[i].atk;
      var def = response[i].def;
      var id = response[i].id;

      console.log("this is the ajax" + response);

      var characterSelector =
        `<div class="card chooseCharacterGrid">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="` +
        avatar +
        `">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">` +
        name +
        `<i class="material-icons right">more_vert</i></span>
      <p> <a class="waves-effect waves-light blue lighten-3 btn-large go-battle" data="` +
        id +
        `">BATTLE</a>
      <a class="waves-effect waves-light red btn-large delete-character"onclick="event.cancelBubble = true;" data="`+ 
      id +
      `">DELETE</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Stats<i class="material-icons right">close</i></span>
      <p> Hit Points: ` +
        hp +
        `</p>
      <p> Attack: ` +
        atk +
        `</p>
      <p> Defense: ` +
        def +
        `</p>
      <p> Wins: ` +
        wins +
        `</p>
      <p> Losses: ` +
        losses +
        `</p>
    </div>
  </div>`;

      $("#characterBoard").append(characterSelector);
      console.log(characterSelector);
    };

    $(".go-battle").click(function (event) {
      console.log("going to battle");
      sessionStorage.setItem("battleCharacterId", $(event.target).attr("data"));
      console.log(sessionStorage.getItem("battleCharacterId"));
      window.location.replace("/battle");
    });

    $(".delete-character").click(function (event) {
      event.stopPropagation();

      console.log("you want to delete this character");
      $.ajax(("/api/character/" + $(event.target).attr("data")), {
        type: "DELETE",
      })
        .then(function (response) {
          // Reload the page to get the updated list of characters
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

// Using this as an example in the code.

// $.ajax("/api/character/5", {
//   type: "GET",
// }).then(function (response) {
//   console.log(response);
//   playerCharacter = response;
//   playerCharacter.currentHP = playerCharacter.hp;
//   $("#player-character-name").text(playerCharacter.character_name);
//   $("#userCharacter").attr("src", playerCharacter.avatar_image);
//   callEnemy();
