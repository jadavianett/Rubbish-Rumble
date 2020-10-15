$(document).ready(function(){
    $('.carousel').carousel();

    $("#view-all-characters").click(function (event) {
      console.log("The view all characters button was clicked");
      let newCharacter = {
        character_name: $("#character-name-form [name=name]").val().trim(),
        advantage: $("#advantage-chosen [name=advantage]:checked").val(),
      };
      console.log(newCharacter);
      //save character information 
      // re route to the view all characters page
      window.location.replace("/allCharacters");
    
        })
    
    $("#add-new-character").click(function (event) {
      console.log("The add new character button was clicked");
      let newCharacter = {
        character_name: $("#character-name-form [name=name]").val().trim(),
        advantage: $("#advantage-chosen [name=advantage]:checked").val(),
      };
      console.log(newCharacter);
      //refresh the page 
      location.reload();
    })
  });