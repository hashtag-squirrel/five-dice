const rollBtn = document.getElementById('roll-button');
const diceOne = document.getElementById('dice').children[0];
const diceTwo = document.getElementById('dice').children[1];
const diceThree = document.getElementById('dice').children[2];
const diceFour = document.getElementById('dice').children[3];
const diceFive = document.getElementById('dice').children[4];
const ones = document.getElementById('ones').children[1];
const twos = document.getElementById('twos').children[1];
const threes = document.getElementById('threes').children[1];
const fours = document.getElementById('fours').children[1];
const fives = document.getElementById('fives').children[1];
const sixes = document.getElementById('sixes').children[1];
const threeOfAKind = document.getElementById('three-of-a-kind').children[1];
const fourOfAKind = document.getElementById('four-of-a-kind').children[1];
const fiveOfAKind = document.getElementById('five-of-a-kind').children[1];
const fullHouse = document.getElementById('full-house').children[1];
const smallStraight = document.getElementById('small-straight').children[1];
const straight = document.getElementById('straight').children[1];
const chance = document.getElementById('chance').children[1];

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
        document.getElementById('dice').children[dice].src = `assets/images/dice-${diceArray[dice]}.png` ;
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