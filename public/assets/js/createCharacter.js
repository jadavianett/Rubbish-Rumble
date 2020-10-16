$(document).ready(function () {
  $(".carousel").carousel();
  // global varable for the avatar image
  let avatarImage = [];
  // click listener for the veiw all characters function
  $("#view-all-characters").click(function (event) {
    console.log("The view all characters button was clicked");
    let newCharacter = {
      character_name: $("#character-name-form [name=name]").val().trim(),
      advantage: $("#advantage-chosen [name=advantage]:checked").val(),
    };
    // runs create character function
    console.log(newCharacter);
    createNewCharacter();
    //save character information
    // re route to the view all characters page
    window.location.replace("/allCharacters");
  });

  // click listener for the image carousel
  // this will log the img src so we can pull the img src through the database
  // need to figure out how to trim it
  $(document).on("click", ".avatar-select img", function () {
    console.log(`You clicked on ${this.id}`);
    avatarImage.push(`${this.src}`), console.log(avatarImage[0]);
  });

  // click listener for creating new characters
  // this also will add thar variable so it can push to the database

  $("#add-new-character").click(function (event) {
    console.log("The add new character button was clicked");
    let newCharacter = {
      character_name: $("#character-name-form [name=name]").val().trim(),
      advantage: $("#advantage-chosen [name=advantage]:checked").val(),
      avatar_image: avatarImage[0],
      wins: 0,
      losses: 0,
    };

    // runs create new character

    createNewCharacter(newCharacter);
    console.log(newCharacter);

    //refresh the page
    // location.reload();
  });
});

// function for creating new characters

function createNewCharacter(newCharacterObj) {
  $.ajax("/api/character", {
    type: "POST",
    data: newCharacterObj,
  }).then(function (response) {
    // Change to character creator
    console.log("Added new Character: " + response);
  });
}
