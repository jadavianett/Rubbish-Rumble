$(document).ready(function () {
    
    // Character Var setup
    // ==============================================================================
    var playerCharacter;
    var currentAction = "";
    var playerResult = "";

    var enemyCharacter;
    var enemyAction = "";
    var enemyresult = "";
    var enemyRandomizer;

    // Sets the character variables equal to the appropriate objects from an api call
    $.ajax("/api/character/5", {
        type: "GET",
    }).then(function (response) {
        console.log(response)
        playerCharacter = response;
        playerCharacter.currentHP = response.hp;
    });

    $.ajax("/api/character/6", {
        type: "GET",
    }).then(function (response) {
        console.log(response)
        enemyCharacter = response;
        enemyCharacter.currentHP = response.hp;
    });

    // While loop continues until one hp drops below zero
    // Causes turns of battle to repeat until one combatant loses
    // ==============================================================================
    while (playerCharacter.currentHP > 0 && enemyCharacter.currentHP > 0) {
        // when an action button is pressed...
        $(".actionBtns").on("click", function(event) {

            // Assign the character's action to a variable
            currentAction = this.id;

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


            // The system checks to see which, if any characters attacked or struck, and resolves the damage based on whether their target defended or countered
            
            // Attacking deals the user's attack stat in damage to the opponent, lowered by their defense if they used defend
            // Striking deals 1.5 times the user's attack in damage to the opponent, lowered by their defense if they used defense
            // Defending reduces damage by the characters defense value, but not lower than zero
            // Countering does nothing unless the opponent used strike, in which case the user takes no damage and deals 2 times the opponent's attack back to them
            
            // If both characters used a defensive move it will be reflected in the text logs, but no damage will be taken

        
            // If the player chose attack...
            // ===========================================================
                // AND the enemy defended
            if (currentAction === "attackBtn" && enemyAction === "defend") {
                // Enemy reduces damage, but not past zero
                outgoingDamage = playerCharacter.atk - enemyCharacter.def;
                if (outgoingDamage < 0) {outgoingDamage = 0};
                // Enemy takes the reduced damage
                enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                playerResult = `The enemy defended! ${playerCharacter.character_name} dealt ${outgoingDamage} to the enemy!`
            } else if (currentAction = "attackBtn") {
                // Enemy takes the full damage if they did not defend
                enemyCharacter.currentHP = enemyCharacter.currentHP - playerCharacter.atk;
                playerResult = `${playerCharacter.character_name} dealt ${outgoingDamage} to the enemy!`
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
                playerResult = `The enemy defended! ${playerCharacter.character_name} struck hard! And dealt ${outgoingDamage} to the enemy!`;
                // OR if the enemy countered
            } else if (currentAction === "strikeBtn" && enemyAction === "counter") {
                // Player takes damage themselves
                incomingDamage = (playerCharacter.atk * 2);
                playerCharacter.currentHP = playerCharacter.currentHP - incomingDamage;
                PlayerResult = `${playerCharacter.character_name} struck hard! But the enemy counters! ${playerCharacter.character_name} took ${incomingDamage}`;
                // OR if the enemy did neither
            } else if (currentAction === "strikeBtn") {
                outgoingDamage = (playerCharacter.atk * 2);
                enemyCharacter.currentHP = enemyCharacter.currentHP - outgoingDamage;
                playerResult = `${playerCharacter.character_name} struck hard! And dealt ${outgoingDamage} to the enemy!`;
            };

            // ENEMY ATTACKS
            // ======================================================================
            
            // If the enemy attacked...
            if (enemyAction)

        });
    };

});