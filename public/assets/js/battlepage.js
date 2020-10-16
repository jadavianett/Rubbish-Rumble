$(document).ready(function () {
    
    // Character Var setup
    // ==============================================================================
    var playerCharacter;
    var currentAction = "";
    var playerResult = "";

    var enemyCharacter;
    var enemyAction = "";
    var enemyResult = "";
    var enemyRandomizer;

    // Sets the character variables equal to the appropriate objects from an api call
    $.ajax("/api/character/5", {
        type: "GET",
    }).then(function (response) {
        console.log(response)
        playerCharacter = response;
        playerCharacter.currentHP = playerCharacter.hp;
        $("#player-character-name").text(playerCharacter.character_name);
        $("#userCharacter").attr("src", playerCharacter.avatar_image);
        callEnemy();
    });

    function callEnemy() {
        $.ajax("/api/character/6", {
            type: "GET",
        }).then(function (response) {
            console.log(response)
            enemyCharacter = response;
            enemyCharacter.currentHP = enemyCharacter.hp;
            $("#enemy-character-name").text(enemyCharacter.character_name);
            $("#compCharacter").attr("src", enemyCharacter.avatar_image);
            if (response) {battleSystem()}
        });
    };
    

    // Causes turns of battle to repeat until one combatant loses
    // ==============================================================================
    function battleSystem() {
        if (playerCharacter.currentHP > 0 && enemyCharacter.currentHP > 0) {
            // when an action button is pressed...
            $(".actionBtns").on("click", function(event) {
    
                // Assign the character's action to a variable
                currentAction = $(event.target).attr("id");
    
                // Randomly decides which action the enemy will take
                enemyRandomizer = Math.random();
                if (enemyRandomizer <= 0.20) {
                    enemyAction = "counter";
                } else if (enemyRandomizer <= 0.40) {
                    enemyAction = "strike";
                } else if (enemyRandomizer <= 0.70) {
                    enemyAction = "defend";
                } else {
                    enemyAction = "attack";
                };
                
                console.log("The player used " + currentAction);
                console.log("The enemy used " + enemyAction);
                
                // The system checks to see which, if any characters attacked or struck, and resolves the damage based on whether their target defended, countered, or did neither
                
                // Attacking deals the user's attack stat in damage to the opponent, lowered by their defense if they used defend
                // Striking deals 1.5 times the user's attack in damage to the opponent, lowered by their defense if they used defense
                // Defending reduces damage by the characters defense value, but not lower than zero
                // Countering does nothing unless the opponent used strike, in which case the user takes no damage and deals 2 times the opponent's attack back to them
                
                // If both characters used a defensive move it will be reflected in the text logs, but no damage will be taken
    
            
                // If the player chose attack...
                // ============================================================
                    // AND the enemy defended
                if (currentAction === "attackBtn" && enemyAction === "defend") {
                    // Enemy reduces damage, but not past zero
                    outgoingDamage = playerCharacter.atk - enemyCharacter.def;
                    if (outgoingDamage < 0) {outgoingDamage = 0};
                    // Enemy takes the reduced damage
                    enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                    playerResult = `The enemy defended! ${playerCharacter.character_name} dealt ${outgoingDamage} damage to the enemy!`
                } else if (currentAction === "attackBtn") {
                    // Enemy takes the full damage if they did not defend
                    outgoingDamage = playerCharacter.atk;
                    enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                    playerResult = `${playerCharacter.character_name} dealt ${outgoingDamage} damage to the enemy!`
                };
    
                // If the player chose strike...
                // ============================================================
                    // AND the enemy defended
                if (currentAction === "strikeBtn" && enemyAction === "defend") {
                    // Enemy reduces damage, but not past zero
                    outgoingDamage = (playerCharacter.atk * 1.5) - enemyCharacter.def;
                    if (outgoingDamage < 0) {outgoingDamage = 0};
                    // Enemy takes the reduced damage
                    enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                    playerResult = `The enemy defended! ${playerCharacter.character_name} struck hard! And dealt ${outgoingDamage} damage to the enemy!`;
                    // OR if the enemy countered
                } else if (currentAction === "strikeBtn" && enemyAction === "counter") {
                    // Player takes damage themselves
                    incomingDamage = (playerCharacter.atk * 2);
                    playerCharacter.currentHP = playerCharacter.currentHP - incomingDamage;
                    playerResult = `${playerCharacter.character_name} struck hard! But the enemy counters! ${playerCharacter.character_name} dealt themselves ${incomingDamage} damage!`;
                    // OR if the enemy did neither
                } else if (currentAction === "strikeBtn") {
                    outgoingDamage = (playerCharacter.atk * 1.5);
                    enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                    playerResult = `${playerCharacter.character_name} struck hard! And dealt ${outgoingDamage} damage to the enemy!`;
                };
    
                // ENEMY ATTACKS
                // ======================================================================
                // If the enemy attacked...
                    // AND the player defended
                if (enemyAction === "attack" && currentAction === "defendBtn") {
                    incomingDamage = enemyCharacter.atk - playerCharacter.def;
                    // Incoming damage is reduced but not past 0
                    if (incomingDamage < 0) {incomingDamage = 0};
                    // Player takes the reduced damage
                    playerCharacter.currentHP = playerCharacter.currentHP - incomingDamage;
                    enemyResult = `The enemy attacks! ${playerCharacter.character_name} defended and took ${incomingDamage} damage!`;
                        // OR if the player did not defend
                } else if (enemyAction === "attack") {
                    // Player takes the full damage
                    incomingDamage = enemyCharacter.atk;
                    playerCharacter.currentHP = playerCharacter.currentHP - enemyCharacter.atk;
                    enemyResult = `The enemy attacks! ${playerCharacter.character_name} took ${incomingDamage} damage!`;
                };
    
                // If the enemy struck...
                    // AND the player defended
                if (enemyAction === "strike" && currentAction === "defendBtn") {
                    incomingDamage = (enemyCharacter.atk * 1.5) - playerCharacter.def;
                    // Incoming damage is reduced but not past 0
                    if (incomingDamage < 0) {incomingDamage = 0};
                    // Player takes the reduced damage
                    playerCharacter.currentHP = playerCharacter.currentHP - incomingDamage;
                    enemyResult = `The enemy struck hard! ${playerCharacter.character_name} defended and took ${incomingDamage} damage!`
                        // OR if the player countered
                } else if (enemyAction === "strike" && currentAction === "counterBtn") {
                    // Enemy takes the increased damage
                    outgoingDamage = (enemyCharacter.atk * 2);
                    enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                    enemyResult = `The enemy struck hard! But ${playerCharacter.character_name} counters! The enemy dealt themselves ${outgoingDamage} damage!`
                        // OR if the player did neither
                } else if(enemyAction === "strike") {
                    //Player takes the full damage
                    incomingDamage = (enemyCharacter.atk * 1.5);
                    playerCharacter.currentHP = playerCharacter.currentHP - incomingDamage;
                    enemyResult = `The enemy struck hard! ${playerCharacter.character_name} takes ${incomingDamage} damage!`;
                };
    
                // STALEMATE
                // These conditions are only to log the results if both combatants defend or counter, resulting in no changes
    
                // IF the player defends
                    // And the enemy defends
                if (currentAction === "defendBtn" && enemyAction === "defend") {
                    // Nothing happens, and the result is logged
                    playerResult = "Both fighters take up a defensive stance...";
                    // OR if the enemy counters
                } else if (currentAction === "defendBtn" && enemyAction === "counter") {
                    playerResult = `${playerCharacter.character_name} takes up a defensive stance, the enemy is sizing them up.`;
                };
    
                // IF the player counters
                    // and the enemy counters
                if (currentAction === "counterBtn" && enemyAction === "counter") {
                    playerResult = "Both fighters are sizing each other up, but neither makes a move.";
                    // OR if the enemy defends
                } else if (currentAction === "counterBtn" && enemyAction === "defend") {
                    playerResult = `${playerCharacter.character_name} is sizing up the enemy. The enemy took up a defensive stance`;
                };
    
                // Log the player result, then the enemy result
                // if (playerResult !== "" && enemyResult !== "") {
                    $("#battle-header").text(`${playerResult}
                    ${enemyResult}`);
                // } else if (playerResult !== "") {
                //     $("#battle-header").text(`${playerResult}`);
                // } else if (enemyResult !== "") {
                //     $("#battle-header").text(`${playerResult}`);
                // };
    
                // Erase the variables for the next turn of battle
                playerResult = "";
                currentAction = "";
                enemyResult = "";
                enemyAction = "";
    
                // Updates the HP bars of both characters
                $("#playerHPbar").width(((playerCharacter.currentHP / playerCharacter.hp) * 100) + "%");
                //$("#playerHPbar").text(`${playerCharacter.currentHP} / ${playerCharacter.hp}`);
                $("#compHPbar").width(((enemyCharacter.currentHP / enemyCharacter.hp) * 100) + "%");
                //$("#compHPbar").text(`${enemyCharacter.currentHP} / ${enemyCharacter.hp}`);
            });
    
        };
    }

    // $("#battle-header").text("The Battle is over!");

});