const rollBtn = document.getElementById('roll-button');

let diceArray = [0, 0, 0, 0, 0];

document.addEventListener('DOMContentLoaded', function() {
    runGame();
    rollBtn.addEventListener('click', function() {rollDice()});
})

/** 
* Runs the game
*/ 
function runGame() {
    console.log("Game is running");
}

/**
* Calculates the score for a picked field and returns the score
*/ 
function calculateFieldScore() {
    console.log("Calculating Field Score");
}

/** 
* Calculates the total score whenever a field is filled
*/
function calculateTotalScore() {
    console.log("Calculating Total Score");
}

/**
* Function to lock dice based on player's choice, returns locked dice
*/
function lockDice() {   
    console.log("Locking Dice");
}

/**
* Function to unlock dice based on player's choice, returns unlocked dice
*/
function unlockDice() {
    console.log("Unlocking Dice");
}

/**
* Generates random numbers between 1 and 6 for unlocked dice, returns the dice values
* and indicates how many rolls left per turn
*/
function rollDice() {
    for (let dice in diceArray) {
        diceArray[dice] = Math.floor(Math.random() * 6) + 1;
    }
    console.log(diceArray);
    return diceArray;
}

/**
* Lets the player pick a field for the turn and ends the turn
*/
function endTurn() {
    console.log("Ending Turn");
}

/**
* Displays a rules popup
*/ 
function displayRules() {
    console.log("Displaying Rules");
}