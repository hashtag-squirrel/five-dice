// Declaring constants

const rollBtn = document.getElementById('roll-button');

const tableBody = document.getElementsByTagName('tbody')[0];

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
let totalScore = 0;
let totalScoreDisplay = document.getElementById('score');

// // Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function() {
    runGame();
})

/** 
* Runs the game
*/ 
function runGame() {
    console.log("Game is running");
    rollBtn.addEventListener('click', function() {rollDice()});
    tableBody.addEventListener('click', function(event) {endTurn(event)});
}

/**
* Calculates the score for a picked field and returns the score
*/ 
function calculateFieldScore(fieldId) {
    let score = 0;
    switch (fieldId) {
        case 'ones':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 1) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'twos':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 2) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'threes':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 3) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'fours':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 4) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'fives':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 5) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'sixes':
            for (i = 0; i < diceArray.length; i++) {
                if (diceArray[i] === 6) {
                    score = score + diceArray[i];
                }
            }
            break;
        case 'three-of-a-kind':
            break;
        case 'four-of-a-kind':
            break;
        case 'five-of-a-kind':
            score = 50
            break;
        case 'full-house':
            score = 25;
            break;
        case 'small-straight':
            score = 30;
            break;
        case 'straight':
            score = 40
            break;
        case 'chance':
            for (i = 0; i < diceArray.length; i++) {
                score = score + diceArray[i];
            }
            break;
    }
    calculateTotalScore(score);
    return score;
}

/** 
* Calculates the total score whenever a field is filled
*/
function calculateTotalScore(fieldScore) {
    totalScore = totalScore + fieldScore;
    totalScoreDisplay.textContent = totalScore;
    return totalScore;
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
    let scoresheetField = this.event.srcElement;
    if (scoresheetField.classList.length === 0) {
        scoresheetField.nextElementSibling.textContent = calculateFieldScore(scoresheetField.nextElementSibling.parentElement.id);
    } else if (scoresheetField.classList.length === 1) {
        scoresheetField.textContent = calculateFieldScore(scoresheetField.parentElement.id);
    } else {
        throw "You cannot enter your score here";
    }
}

/**
* Displays a rules popup
*/ 
function displayRules() {
    console.log("Displaying Rules");
}