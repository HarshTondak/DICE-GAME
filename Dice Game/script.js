'use strict';

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// Method one to access an id
const score0El = document.querySelector("#score--0");
const current0El = document.querySelector("#current--0");
// Method two to access an id
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");
// Accessing dice image class
const diceEl = document.querySelector(".dice");
// Accessing the buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


// Player Switching function
const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer===0 ? 1 : 0);
    // "toggle" adds the given class if not present in the object, otherwise if present then removes the given class from the object
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

let currentScore, activePlayer, playing, scores;
// INITIAL CONDITIONS
const initially = function(){
    // Variables
    currentScore = 0;
    activePlayer = 0;
    // For storing the scores of both players
    scores = [0, 0];
    // To check if we are currently playing or the game has finished
    // Based on this we will be able to press the buttons to play game...
    playing = true;
    
    // Hiding the dice image initially
    diceEl.classList.add("hidden");
    // Resetting overall scores of both players
    score0El.textContent = 0;
    score1El.textContent = 0;
    // Resetting current scores of both players
    current0El.textContent = 0;
    current1El.textContent = 0;

    // Removing winner class from both players
    // If class is not present already then it will not affect the code :)
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");

    // Making the player0 active
    // If class is present already then also it will not affect the code :)
    player0El.classList.add("player--active");
    // Removing the active class from player1
    player1El.classList.remove("player--active");
}

// INITIALLY SETIING-UP THE GAME...
initially();


// Rolling dice functionality
// On pressing the ROLL button
btnRoll.addEventListener("click", function(){
    // Checking if we are curring playing or the game is finished...
    if(playing){
        // Generating random dice roll
        const diceVal = Math.trunc(Math.random()*6) + 1;

        // Display the dice accordingly
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${diceVal}.png`;

        if(diceVal !== 1){
            // Add diceVal to the score
            currentScore += diceVal;
            // Dynamically updating the score of player wrt activePlayer...
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            // Switch the player
            switchPlayer();
        }
    }
});

// On pressing the HOLD button
btnHold.addEventListener("click", function(){
    // Checking if we are curring playing or the game is finished...
    if(playing){
        // Add current score to active player's score
        scores[activePlayer] += currentScore; 
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            // If yes, finish the game
            diceEl.classList.add("hidden");
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
        else{
            // Change the player
            switchPlayer();

        }
    }
});

// On pressing the NEW GAME button
// "initially" will be called by JS automatically so we don't use "initially()"
btnNew.addEventListener("click", initially);