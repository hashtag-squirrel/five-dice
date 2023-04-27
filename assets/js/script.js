// Declaring constants
// Constants from game area
const numberOfRollsSpan = document.getElementById('number-of-rolls');
const rollBtn = document.getElementById('roll-button');
const gameArea = document.getElementById('game-area');

// Constants for dice
const allDice = document.getElementById('dice');

// Constants from scoresheet area
const scoresheetArea = document.getElementById('scoresheet-area');
const tableBody = document.getElementsByTagName('tbody')[0];
const playerNameDisplay = document.getElementById('player-name');

const totalScoreDisplay = document.getElementById('score');

// Constants from rules area
const rulesArea = document.getElementById('rules-area');
const hideRulesBtn = document.getElementById('hide-rules-btn');

// Constants from highscores area
const highscoresArea = document.getElementById('highscores-area');
const hideHighscoresBtn = document.getElementById('hide-highscores-btn');
const highscoresBody = document.getElementById('highscores-body');

// Constants from hint area
const hintArea = document.getElementById('hint-area');
const tableHint = document.getElementById('table-hint');
const lockHint = document.getElementById('lock-hint');

// Constants from footer
const footer = document.getElementsByTagName('footer')[0];
const rulesBtn = document.getElementById('rules');
const highscoresBtn = document.getElementById('highscores-btn');

// Declaring global variables
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
let highscoresArray = [
    {
        name: 'Can',
        score: 200,
    },
    {
        name: 'You',
        score: 180,
    },
    {
        name: 'Beat',
        score: 160,
    },
    {
        name: 'These',
        score: 140,
    },
    {
        name: 'Scores',
        score: 120,
    },
    {
        name: 'That',
        score: 100,
    },
    {
        name: 'Are',
        score: 80,
    },
    {
        name: 'Hard',
        score: 60,
    },
    {
        name: 'Coded',
        score: 40,
    },
    {
        name: 'Here',
        score: 20,
    }
];
let totalScore;
let numberOfRolls;
let numberOfRounds;
let playerName;
let randomName;

// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function() {
    setHighscores();
    setTimeout(getPlayerName, 300);
    setTimeout(getHighscores, 300);
    buildHighscoreTable();
    playerName = playerNameDisplay.addEventListener('click', changePlayerName);
    runGame();
})

/** 
* Runs the game
*/ 
function runGame() {
    console.log("Running game...");
    for (let i = 0; i < 13; i++) {
        tableBody.children[i].children[1].textContent = '';
    }
    totalScore = 0;
    numberOfRolls = 3;
    numberOfRounds = 13;
    displayHint(true, 'lockHint');
    updateRolls();
    enableRollBtn();
    tableBody.addEventListener('click', function(event) {endTurn(event)});
    allDice.addEventListener('click', function(event) {toggleDice(event)});
    rulesBtn.addEventListener('click', displayRules);
    highscoresBtn.addEventListener('click', displayHighscores);
}

/**
 * Runs when the game is over
 */
function endGame() {
    console.log('Game is over');
    setTimeout(function () {
        if (confirm(`Congratulations, your score is ${totalScore}!\nDo you want to play again?`)) {
            runGame();
        } else {
            alert("See you next time!");
        }
    }, 1000);
    addHighscore();
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
                for (let i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 1) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'twos':
                for (let i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 2) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'threes':
                for (let i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 3) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'fours':
                for (let i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 4) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'fives':
                for (let i = 0; i < diceArray.length; i++) {
                    if (diceArray[i].value === 5) {
                        score = score + diceArray[i].value;
                    }
                }
                break;
            case 'sixes':
                for (let i = 0; i < diceArray.length; i++) {
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
                    for (let i = 0; i < diceArray.length; i++) {
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
                    for (let i = 0; i < diceArray.length; i++) {
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
                for (let i = 0; i < diceArray.length; i++) {
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
    console.log(event);
    let clickedDice = event.srcElement;
    let diceId = clickedDice.id;
    let diceClassList = clickedDice.classList;   
    if (numberOfRolls === 3) {
        alert('You need to roll before you can lock any dice.');
    } else {
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
    enableRollBtn();
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
                document.getElementById('dice').children[dice].src = `assets/images/dice-${diceArray[dice].value}.png`;
                document.getElementById('dice').children[dice].alt = `A dice showing the number ${diceArray[dice].value}`;
            }
        }
        numberOfRolls = numberOfRolls - 1;
        updateRolls();
        if (numberOfRolls === 0) {
            disableRollBtn();
            if (numberOfRounds === 13) {
                displayHint(false, 'lockHint');
                displayHint(true, 'tableHint');
            }
        }
    } else {
        alert('No rolls left. Please pick a field to enter your score');
    }
    return diceArray;
}

/**
* Lets the player pick a field for the turn and ends the turn
*/
function endTurn(event) {
    console.log(`Ending turn... ${numberOfRounds} rounds left`)
    displayHint(false, 'tableHint');
    let scoresheetField = event.srcElement;
    if (numberOfRolls === 3) {
        alert('You need to roll the dice to start the round.');
    } else if (numberOfRolls < 3) {
        if (scoresheetField.classList.length === 0) {
            if (scoresheetField.nextElementSibling.textContent !== '') {
                alert('Field already filled, pick another field');
            } else {
                scoresheetField.nextElementSibling.textContent = calculateFieldScore(scoresheetField.nextElementSibling.parentElement.id, scoresheetField.nextElementSibling);
                numberOfRolls = 3;
                updateRolls();
                unlockAllDice();
                numberOfRounds = numberOfRounds - 1;
            }
        } else if (scoresheetField.classList.length === 1) {
            if (scoresheetField.textContent !== '') {
                alert('Field already filled, pick another field');
            } else {
                scoresheetField.textContent = calculateFieldScore(scoresheetField.parentElement.id, scoresheetField);
                numberOfRolls = 3;
                updateRolls();
                unlockAllDice();
                numberOfRounds = numberOfRounds - 1;
            }
        } else {
            throw "You cannot enter your score here";
        }
    }
    if (numberOfRounds === 0) {
        endGame();
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

// Removes Event Listener for Roll Button and removes class 'active'
function disableRollBtn() {
    rollBtn.classList = "btn inactive";
    rollBtn.removeEventListener('click', rollDice);
    rollBtn.textContent = "Pick A Score";
}

/**
 * Adds Event Listener for Roll Button and adds class 'active'
*/ 
function enableRollBtn() {
    rollBtn.classList = "btn active";
    rollBtn.addEventListener('click', rollDice);
    rollBtn.textContent = "Roll Dice";
}

/**
 * Changes player name
 */
function changePlayerName() {
    console.log('Changing player name...');
    let newName = prompt('Please enter your name. If you do not want to pick a name now, the computer will assign a random name.\n\nYou can change the name any time by clicking on the name.');
    if (newName !== '' && newName !== null) {
        playerNameDisplay.textContent = newName;
        localStorage.setItem('playerName', newName);
        return newName;
    } else {
        getRandomName();
        setTimeout(function() {
            console.log(`Player did not choose a name, generated random name ${randomName}`);
            playerNameDisplay.textContent = randomName;
            playerName = randomName;
            return randomName;
        }, 500);
    }
}

/**
 * Gets the player name if one is saved to local storage
 */
function getPlayerName() {
    let savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName !== '' && savedPlayerName !== null) {
        playerName = savedPlayerName;
        playerNameDisplay.textContent = playerName;
        return playerName;
    } else {
        changePlayerName();
    }
}

/**
 * Gets a random name from a name generator API and returns it
 */
async function getRandomName() {
    // API call for random name
    const url = `https://randomuser.me/api/`
    const response = await fetch(url);
    const jsonData = await response.json();
    randomName = jsonData.results[0].name.first;
    console.log(randomName);
    return randomName;
}

/**
* Displays rules
*/ 
function displayRules() {
    console.log("Displaying rules...");
    rulesArea.style = "display: block";
    gameArea.style = "display: none";
    scoresheetArea.style = "display: none";
    footer.style = "display: none";
    hintArea.style = "display: none";
    hideRulesBtn.addEventListener('click', function() {
        rulesArea.style = "display: none";
        gameArea.style = "";
        scoresheetArea.style = "";
        footer.style = "";
    })
}

/**
* Displays highscores
*/ 
function displayHighscores() {
    console.log("Displaying highscores...");
    highscoresArea.style = "display: block";
    gameArea.style = "display: none";
    scoresheetArea.style = "display: none";
    footer.style = "display: none";
    hideHighscoresBtn.addEventListener('click', function() {
        highscoresArea.style = "display: none";
        gameArea.style = "";
        scoresheetArea.style = "";
        footer.style = "";
    })
}

/**
 * Displays hint after last roll of first round, 
 * will not be displayed again if player clicks on rules or highscores
 */
function displayHint(bool, hintType) {
    switch (hintType) {
        case 'tableHint':
            if (bool === true) {
                tableHint.style = "";
            } else {
                tableHint.style = "display: none";
            }
            break;
        case 'lockHint':
            if (bool === true) {
                lockHint.style = "";
            } else {
                lockHint.style = "display: none";
            }
            break;
    }
}

/**
 * Adds score to highscores
 */
function addHighscore() {
    console.log('Adding highscores...');
    console.log(playerName);
    let highscore = {
        name: playerName,
        score: totalScore
    }
    for (let i = 0; i < highscoresArray.length; i++) {
        if (totalScore >= highscoresArray[i].score) {
            highscoresArray.splice(i, 0, highscore);
            highscoresArray.pop();
            buildHighscoreTable();
            setHighscores();
            break;
        } else if (totalScore < highscoresArray[i]) {
            continue;
        } else {
            console.log('I dont even know what is happening.');
        }
    }
}

/**
 * Fills highscores table with scores stored in highscoresArray
 */
function buildHighscoreTable() {
    for (let i = 0; i < highscoresArray.length; i++) {
        highscoresBody.children[i].children[1].textContent = highscoresArray[i].name;
        highscoresBody.children[i].children[2].textContent = highscoresArray[i].score;
    }
}

/**
 * Gets highscores from localStorage
 */
function getHighscores() {
    JSON.parse(localStorage.getItem('highscores'));
}

/**
 * Saves highscores in localStorage
 */
function setHighscores() {
    localStorage.setItem('highscores', JSON.stringify(highscoresArray));
}