/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousScore;
init();

function nextPlayer() {
  //Change round score to 0
  roundScore = 0;
  //Switch active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //Set round scores to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //Toggle active player UI
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //Hide dice icon
  document.querySelector(".dice").style.display = "none";
}

//Roll Button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    if (dice == 6 && previousScore[activePlayer] == 6) {
      scores[activePlayer] = 0;
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      previousScore[activePlayer] = dice;
    } else {
      // Next PLayer

      nextPlayer();
    }
  }
});

//Hold Button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.getElementById("input-form").value;
    var winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if player won
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// New Game Button
document.querySelector(".btn-new").addEventListener("click", init);

// Game initialization
function init() {
  scores = [0, 0];
  roundScore = 0;
  previousScore = [0, 0];
  activePlayer = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  gamePlaying = true;
}
