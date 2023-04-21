// Declaring constants
const numberOfRollsSpan = document.getElementById('number-of-rolls');
const rollBtn = document.getElementById('roll-button');

const allDice = document.getElementById('dice');
const diceOne = document.getElementById('dice').children[0];
const diceTwo = document.getElementById('dice').children[1];
const diceThree = document.getElementById('dice').children[2];
const diceFour = document.getElementById('dice').children[3];
const diceFive = document.getElementById('dice').children[4];

const tableBody = document.getElementsByTagName('tbody')[0];

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

const rulesBtn = document.getElementById('rules');

// Declaring variables
let diceArray = [
    {
        value: 0,
        state: 'unlocked',
    },
    {
        value: 0,
        state: 'unlocked',
    },
    {
        value: 0,
        state: 'unlocked',
    },
    {
        value: 0,
        state: 'unlocked',
    },
    {
        value: 0,
        state: 'unlocked',
    },
];
let totalScore = 0;
let totalScoreDisplay = document.getElementById('score');
let numberOfRolls = 3;

// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function() {
    runGame();
})

/** 
* Runs the game
*/ 
function runGame() {
    console.log("Running game...");
    numberOfRolls = 3;
    updateRolls();
    rollBtn.addEventListener('click', function() {rollDice()});
    tableBody.addEventListener('click', function(event) {endTurn(event)});
    allDice.addEventListener('click', function(event) {toggleDice(event)});

}

/**
* Updates the number of rolls displayed to the player
*/
function updateRolls() {
    console.log('Updating number of rolls...')
    numberOfRollsSpan.textContent = numberOfRolls;
}

/**
* Calculates the score for a picked field and returns the score
*/ 
function calculateFieldScore(fieldId, field) {
    console.log('Calculating field score...')
    let score = 0;
    if (field.textContent === '') {
        switch (fieldId) {
            case 'ones':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 1) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'twos':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 2) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'threes':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 3) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'fours':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 4) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'fives':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 5) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'sixes':
                for (i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 6) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'three-of-a-kind':
                if (Object.values(findDuplicates()).includes(3) ||
                    Object.values(findDuplicates()).includes(4) ||
                    Object.values(findDuplicates()).includes(5)
                ) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i].value;
                    }
                } else {
                    score = 0;
                }
                break;
            case 'four-of-a-kind':
                if (Object.values(findDuplicates()).includes(4) ||
                    Object.values(findDuplicates()).includes(5)
                ) {
                    for (i = 0; i < diceArray.length; i++) {
                        score = score + diceArray[i].value;
                    }
                } else {
                    score = 0;
                }
                break;
            case 'five-of-a-kind':
                if (Object.values(findDuplicates()).includes(5)) 
                {
                    score = 50;
                } else {
                    score = 0;
                }
                break;
            case 'full-house':
                if ((Object.values(findDuplicates()).includes(3) && Object.values(findDuplicates()).includes(2)) ||
                    Object.values(findDuplicates()).includes(5)) 
                {
                    score = 25;
                } else {
                    score = 0;
                }
                break;
            case 'small-straight':
                if ((findNumber(1) && findNumber(2) && findNumber(3) && findNumber(4)) ||
                    (findNumber(2) && findNumber(3) && findNumber(4) && findNumber(5)) ||
                    (findNumber(3) && findNumber(4) && findNumber(5) && findNumber(6))) 
                {
                    score = 30;
                } else {
                    score = 0;
                }
                break;
            case 'straight':
                if ((findNumber(1) && findNumber(2) && findNumber(3) && findNumber(4) && findNumber(5)) ||
                (findNumber(2) && findNumber(3) && findNumber(4) && findNumber(5) && findNumber(6))) 
                {
                    score = 40;
                } else {
                    score = 0;
                }
                break;
            case 'chance':
                for (i = 0; i < diceArray.length; i++) {
                    score = score + diceArray[i].value;
                }
                break;
        }
        calculateTotalScore(score);
        return score;
    } 
}

/** 
* Calculates the total score whenever a field is filled
*/
function calculateTotalScore(fieldScore) {
    console.log('Calculating total score...')
    totalScore = totalScore + fieldScore;
    totalScoreDisplay.textContent = totalScore;
    return totalScore;
}

/**
* Function to lock or unlock dice based on player's choice, returns dice state to diceArray
*/
function toggleDice(event) {   
    console.log("Toggling dice...");
    let clickedDice = this.event.srcElement;
    let diceId = clickedDice.id;
    let diceClassList = clickedDice.classList;   
    if (diceClassList.length === 0) {
        // lock
        diceClassList.add("locked");
        switch (diceId) {
            case 'dice-one':
                diceArray[0].state = 'locked';
                break;
            case 'dice-two':
                diceArray[1].state = 'locked';
                break;
            case 'dice-three':
                diceArray[2].state = 'locked';
                break;
            case 'dice-four':
                diceArray[3].state = 'locked';
                break;
            case 'dice-five':
                diceArray[4].state = 'locked';
                break;
        }
    } else {
        // unlock
        diceClassList.remove('locked');
        switch (diceId) {
            case 'dice-one':
                diceArray[0].state = '';
                break;
            case 'dice-two':
                diceArray[1].state = '';
                break;
            case 'dice-three':
                diceArray[2].state = '';
                break;
            case 'dice-four':
                diceArray[3].state = '';
                break;
            case 'dice-five':
                diceArray[4].state = '';
                break;
        }
    }
}

/**
 * Function to set classList of all dice to empty
 */
function unlockAllDice() {
    console.log('Unlocking dice...');
    for (let i = 0; i < 5; i++) {
        if (allDice.children[i].classList.length > 0) {
            allDice.children[i].classList.remove('locked');
            diceArray[i].state = 'unlocked';
        } else {
            continue;
        }
    }
}

/**
* Generates random numbers between 1 and 6 for unlocked dice, returns the dice values
* and indicates how many rolls left per turn
*/
function rollDice() {
    console.log('Rolling dice...')
    if (numberOfRolls > 0) {
        for (let dice in diceArray) {
            if (diceArray[dice].state === 'locked') {
                continue;
            } else {
                diceArray[dice].value = Math.floor(Math.random() * 6) + 1;
                document.getElementById('dice').children[dice].src = `assets/images/dice-${diceArray[dice].value}.png` ;
            }
        }
        numberOfRolls = numberOfRolls - 1;
        updateRolls();
    } else {
        alert('No rolls left. Please pick a field to enter your score');
    }
    return diceArray;
}

/**
* Lets the player pick a field for the turn and ends the turn
*/
function endTurn() {
    console.log('Ending turn...')
    let scoresheetField = this.event.srcElement;
    if (diceArray[0].value !== 0) {
        if (scoresheetField.classList.length === 0) {
            if (scoresheetField.nextElementSibling.textContent !== '') {
                alert('Field already filled, pick another field');
            } else {
                scoresheetField.nextElementSibling.textContent = calculateFieldScore(scoresheetField.nextElementSibling.parentElement.id, scoresheetField.nextElementSibling);
                numberOfRolls = 3;
                updateRolls();
                unlockAllDice();
            }
        } else if (scoresheetField.classList.length === 1) {
            if (scoresheetField.textContent !== '') {
                alert('Field already filled, pick another field');
            } else {
                scoresheetField.textContent = calculateFieldScore(scoresheetField.parentElement.id, scoresheetField);
                numberOfRolls = 3;
                updateRolls();
                unlockAllDice();
            }
        } else {
            throw "You cannot enter your score here";
        }
    } else {
        alert('You need to roll the dice to start the game');
    }
    
}

/**
* Checks dice for duplicate faces and returns object diceFaces 
*/
function findDuplicates() {
    console.log('Finding duplicates...')
    let diceFaces = {
        onesInArray: 0,
        twosInArray: 0,
        threesInArray: 0,
        foursInArray: 0,
        fivesInArray: 0,
        sixesInArray: 0,
    }
    for (let i = 0; i < diceArray.length; i++) {
        switch(diceArray[i].value) {
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

// Returns true if a number is a value of the diceArray
function findNumber(number) {
    console.log('Finding number...')
    let containsNumber = false;
    for (let i = 0; i < diceArray.length; i++) {
        if (diceArray[i].value === number) {
            containsNumber = true;
        } 
    }
    return containsNumber;
}

/**
* Displays a rules popup
*/ 
function displayRules() {
    console.log("Displaying rules...");
}