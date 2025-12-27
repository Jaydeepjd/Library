// 1. Instances of all nodes
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

let player1score = document.querySelector("#score--0");
let player2score = document.querySelector("#score--1");

let currentScore1 = document.querySelector("#current--0");
let currentScore2 = document.querySelector("#current--1");

let diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// 2.declare few variables for internal working
let score1, score2, currentScore, activePlayer, playing;

// 3. new game button functionality
let init = () => {
  // 3.1 set all scores to 0
  score1 = 0;
  score2 = 0;
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  player1score.textContent = score1;
  player2score.textContent = score2;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  // 3.2 set player1 as active player
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  // 3.3 remove dice image
  diceEl.classList.add("hidden");
};
init();

let changePlayer = () => {
  // 4.1.3.2.1 change the player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // 4.1.3.2.2 current score will be 0 now
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// 4. Roll dice button click functionality
const rollDice = () => {
  // 4.1 currently we are playing or not
  if (playing === true) {
    // 4.1.1 we have to generate a random number between 1-6
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    // 4.1.2 display the dice roll of the random number
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove("hidden");
    // 4.1.3 if random number not 1
    if (randomNumber !== 1) {
      // 4.1.3.1.1 add random number to current score
      currentScore = currentScore + randomNumber;

      // 4.1.3.1.2 show the score on the ui
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
};
let scoring = (scr, play, player1scr) => {
  // 5.1.2 check score is greater than 20 or not
  if (scr >= 20) {
    // 5.1.2.1 if gretaer than stop the game and disable all the buttons
    playing = false;
    diceEl.classList.add("hidden");
    play.classList.add("player--winner");
  } else {
    changePlayer();
  }
};

// 5. Hold button functionality
const holdDice = () => {
  // 5.1 currently we are playing or not
  if (playing === true) {
    // 5.1.1 Add current score into total score of active player
    if (activePlayer === 0) {
      score1 = score1 + currentScore;
      player1score.textContent = score1;
      scoring(score1, player1, player1score);
    } else {
      score2 = score2 + currentScore;
      player2score.textContent = score2;
      scoring(score2, player2, player2score);
    }
  }
};

// 6.Events
btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdDice);
