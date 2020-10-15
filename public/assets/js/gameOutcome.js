$(document).ready(function(){
    $("#battle-again").click(function(){
        // window.location.replace(battle); 
    });
    $("#create-another-character").click(function() {
        window.location.replace("/createCharacter");
    });
    $("#view-all-characters").click(function() {
        window.location.replace("/allCharacters");
    })
    

  });