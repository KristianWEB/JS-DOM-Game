/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach custom input inserted by him wins the game


*/



//! ********************************************************************* VARIABLES PLACE ***********************************************


//? DICE
const dice = document.querySelector('.dice');

//? PLAYER1,2 PROPERTIES
const p1score = document.querySelector('#score-0');
const p1CurrentScore = document.querySelector('#current-0');

const p2score = document.querySelector('#score-1');
const p2CurrentScore = document.querySelector('#current-1');

let p1FinalScore,
    p2FinalScore;


//? PLAYER1,2 PANEL
const p1Panel = document.querySelector('#player1__panel');
const p2Panel = document.querySelector('#player2__panel');

//? GAME STATE
let gamePlaying = true;

//? NEW GAME BTN
const newGame = document.querySelector('.btn-new');

//? HOLD POINTS BTN
let holdPoints = document.querySelector('.btn-hold');

//? INPUT VALUE 
const inputBtn = document.querySelector('.final-score');
let inputValue;

//? ROLL THE DICE BTN
const rollDice = document.querySelector('.btn-roll');


//! *******************************************************************



//! ********************************************************************* FUNCTIONS PLACE ***********************************************


//? initialize the game

function initializer() {

    //* Set PLAYER 1,2'S SCORE TO 0
    p1score.textContent = 0;
    p1CurrentScore.textContent = 0;

    p2score.textContent = 0;
    p2CurrentScore.textContent = 0;


    dice.style.display = "none";
}


//? add points to the current player by detecting class
const active = 'active';

function classChecker(active) {
    if (p1Panel.classList.contains(active)) {
        return true;

    } else if (p2Panel.classList.contains(active)) {
        return false;
    }
}

//? Active game
function gameActive() {
    if (gamePlaying) {
        //* Declare diceValue at every click
        let diceValue = Math.floor((Math.random() * 6) + 1);

        dice.style.display = 'block';


        //* Set the SRC attribute to the generated number
        dice.src = 'dice-' + diceValue + '.png';

        //? add points to the current playerr
        if (classChecker(active)) {
            p1FinalScore = p1CurrentScore.textContent = parseInt(p1CurrentScore.textContent) + diceValue;
        } else {
            p2FinalScore = p2CurrentScore.textContent = parseInt(p2CurrentScore.textContent) + diceValue;
        }


        //? Erase current player points if dice is 1 
        if (diceValue === 1) {
            if (classChecker(active)) {
                p1CurrentScore.textContent = 0;
                p1score.textContent = 0;
            } else {
                p2CurrentScore.textContent = 0;
                p2score.textContent = 0;
            }

            if (classChecker(active)) {
                p1Panel.classList.remove('active');
                p2Panel.classList.add('active');

            } else {
                p2Panel.classList.remove('active');
                p1Panel.classList.add('active');
            }

        }
    }
}

function holdPointsBtn() {
    if (gamePlaying) {

        //* add current points to current player
        if (classChecker(active)) {
            p1score.textContent = parseInt(p1score.textContent) + p1FinalScore;

            p1CurrentScore.textContent = 0;

        } else {
            p2score.textContent = parseInt(p2score.textContent) + p2FinalScore;

            p2CurrentScore.textContent = 0;
        }


        //* Switch sides when holdPoints is clicked
        if (classChecker(active)) {
            p1Panel.classList.remove('active');
            p2Panel.classList.add('active');
        } else {
            p2Panel.classList.remove('active');
            p1Panel.classList.add('active');
        }

        //* Get Winner and stop the game
        if (p1score.textContent >= inputValue) {
            p1score.textContent = 'WINNER!!';
            dice.style.display = 'none';
            gamePlaying = false;


        } else if (p2score.textContent >= inputValue) {
            p2score.textContent = 'WINNER!!';
            gamePlaying = false;

        }

    }
}


function newGameBtn() {
    //* erase all points and hide dice
    gamePlaying = true;
    p1score.textContent = 0;
    p2score.textContent = 0;
    dice.style.display = 'none';

    if (classChecker(active)) {
        p2Panel.classList.remove('active');
        p1Panel.classList.add('active');
    }
}


//!  *******************************************************************


initializer();
classChecker(active);
rollDice.addEventListener('click', gameActive);
holdPoints.addEventListener('click', holdPointsBtn);
newGame.addEventListener('click', newGameBtn);
inputBtn.addEventListener('input', function () {
    inputValue = parseInt(this.value);
})