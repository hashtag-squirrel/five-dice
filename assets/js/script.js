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
function calculateFieldScore(fieldId, field) {
    let score = 0;
    if (field.textContent === '') {
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
                if (findDuplicates().onesInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().twosInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().threesInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().foursInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().fivesInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates.sixesInArray >= 3) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else {
                    score = 0;
                }
                break;
            case 'four-of-a-kind':
                if (findDuplicates().onesInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().twosInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().threesInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().foursInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates().fivesInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else if (findDuplicates.sixesInArray >= 4) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i];
                    }
                } else {
                    score = 0;
                }
                break;
            case 'five-of-a-kind':
                console.log(diceArray);
                if (diceArray[0] === diceArray[1] &&
                    diceArray[0] === diceArray[2] &&
                    diceArray[0] === diceArray[3] &&
                    diceArray[0] === diceArray[4]) 
                {
                    score = 50;
                } else {
                    score = 0;
                }
                break;
            case 'full-house':
                score = 25;
                break;
            case 'small-straight':
                if ((diceArray.includes(1) && diceArray.includes(2) && diceArray.includes(3) && diceArray.includes(4)) ||
                    (diceArray.includes(2) && diceArray.includes(3) && diceArray.includes(4) && diceArray.includes(5)) ||
                    (diceArray.includes(3) && diceArray.includes(4) && diceArray.includes(5) && diceArray.includes(6))) 
                {
                    score = 30;
                } else {
                    score = 0;
                }
                break;
            case 'straight':
                if ((diceArray.includes(1) && diceArray.includes(2) && diceArray.includes(3) && diceArray.includes(4) && diceArray.includes(5)) ||
                (diceArray.includes(2) && diceArray.includes(3) && diceArray.includes(4) && diceArray.includes(5) && diceArray.includes(6)))
                {
                    score = 40;
                } else {
                    score = 0;
                }
                break;
            case 'chance':
                for (i = 0; i < diceArray.length; i++) {
                    score = score + diceArray[i];
                }
                break;
        }
        calculateTotalScore(score);
        return score;
    } else {
        oldScore = field.textContent;
        score = field.textContent;
        
    }
    
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
    return diceArray;
}

/**
* Lets the player pick a field for the turn and ends the turn
*/
function endTurn() {
    let scoresheetField = this.event.srcElement;
    if (scoresheetField.classList.length === 0) {
        if (scoresheetField.nextElementSibling.textContent !== '') {
            alert('Field already filled, pick another field');
        } else {
            scoresheetField.nextElementSibling.textContent = calculateFieldScore(scoresheetField.nextElementSibling.parentElement.id, scoresheetField.nextElementSibling);
        }
    } else if (scoresheetField.classList.length === 1) {
        if (scoresheetField.textContent !== '') {
            alert('Field already filled, pick another field');
        } else {
            scoresheetField.textContent = calculateFieldScore(scoresheetField.parentElement.id, scoresheetField);
        }
    } else {
        throw "You cannot enter your score here";
    }
}

function findDuplicates() {
    let diceFaces = {
        onesInArray: 0,
        twosInArray: 0,
        threesInArray: 0,
        foursInArray: 0,
        fivesInArray: 0,
        sixesInArray: 0,
    }
    for (let i = 0; i < diceArray.length; i++) {
        switch(diceArray[i]) {
            case 1:
                diceFaces.onesInArray++;
                break;
            case 2:
                diceFaces.twosInArray++;
                break;
            case 3:
                diceFaces.threesInArray++;
                break;
            case 4:
                diceFaces.foursInArray++;
                break;
            case 5:
                diceFaces.fivesInArray++;
                break;
            case 6:
                diceFaces.sixesInArray++;
                break;
            default:
                throw "The item in the array is not a number!"
        }
    }
    return diceFaces;
}

/**
* Displays a rules popup
*/ 
function displayRules() {
    console.log("Displaying Rules");
}