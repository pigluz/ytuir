// TODO:
// # Rewrite this whole code
// # Simplify it
// # Add css styling (and maybe animations) // kinda ✔
// # Add multiple containers
//  (for example: When user first visits the webpage, they firstly get the instruction, if user clicks ok,
//   the div dissapears and it's replaced by the game's container.)  ✔
// # Add timer  ✔

const symbols = ["↑", "↓", "←", "→"];

var points = 0;
let highscore = 0;

var timeleft = 10;
var countdownTimer;

let symbolOneSpan = document.getElementById("symbol1");
let symbolTwoSpan = document.getElementById("symbol2");
let symbolThreeSpan = document.getElementById("symbol3");
let symbolFourSpan = document.getElementById("symbol4");

let symbolOne = symbols[Math.floor(Math.random() * 4)];
let symbolTwo = symbols[Math.floor(Math.random() * 4)];
let symbolThree = symbols[Math.floor(Math.random() * 4)];
let symbolFour = symbols[Math.floor(Math.random() * 4)];

function convertToSymbols() {
  let userInputValue = document.getElementById("userInput").value.toLowerCase();
  console.log(
    "Wartość UserInputValue w funkcji ConvertToSymbols(): ",
    userInputValue
  );

  if (userInputValue == "a") {
    return "←";
  } else if (userInputValue == "w") {
    return "↑";
  } else if (userInputValue == "s") {
    return "↓";
  } else if (userInputValue == "d") {
    return "→";
  } else {
    return "WRONG";
  }
}

function introductionOK() {
  document.getElementById("introduction_container").style.display = "none";
  document.getElementById("game_container").style.display = "block";
}

function startGame() {
  document.getElementById("highscoreNEW").innerHTML = "";
  document.getElementById("pointsValue").innerHTML = points;
  document.getElementById("time").innerHTML = timeleft;

  document.getElementById("points_container").style.display = "block";
  document.getElementById("timerText").style.display = "block";
  document.getElementById("pointsText").style.display = "block";
  document.querySelector("input").style.display = "block";
  document.getElementById("startButton").style.display = "none";

  console.log("-----------START GRY---------------");
  points = 0;
  console.log("Początkowe punkty: ", points);

  symbolOneSpan.innerHTML = ` ${symbolOne} `;
  symbolTwoSpan.innerHTML = ` ${symbolTwo} `;
  symbolThreeSpan.innerHTML = ` ${symbolThree} `;
  symbolFourSpan.innerHTML = ` ${symbolFour} `;

  document.getElementById("userInput").addEventListener("input", game);

  countdownTimer = setInterval(function () {
    timeleft--;
    if (timeleft < 0) {
      timer();
    }
    console.log("Czas: ", timeleft);
    document.getElementById("time").innerHTML = timeleft;
  }, 1000);
}

function game() {
  let rndIndex = Math.floor(Math.random() * 4);
  let symbolUserInput = convertToSymbols();
  console.log("Wartość UserInputValue po wyjsciu z funkcji: ", symbolUserInput);

  this.value = "";
  this.innerHTML = "";

  if (symbolOne == symbolUserInput) {
    points++;
    console.log("Punkty: ", points);

    symbolOne = symbolTwo;
    symbolTwo = symbolThree;
    symbolThree = symbolFour;
    symbolFour = symbols[rndIndex];

    symbolOneSpan.innerHTML = ` ${symbolOne} `;
    symbolTwoSpan.innerHTML = ` ${symbolTwo} `;
    symbolThreeSpan.innerHTML = ` ${symbolThree} `;
    symbolFourSpan.innerHTML = ` ${symbolFour} `;

    document.getElementById("pointsValue").innerHTML = points;
  } else {
    loseGame(points);
  }
}

function timer() {
    clearInterval(countdownTimer);
    timeleft = 10;
    timeUp(points);
  }

function loseGame(points) {
  clearInterval(countdownTimer);
  console.log("-----------KONIEC GRY---------------");
  console.log("punkty ", points, " highscore: ", highscore);

  alert("You pressed the wrong button! You lost!");

  if (points > highscore) {
    highscore = points;
    document.getElementById("highscoreValue").innerHTML = highscore;
    document.getElementById("highscoreNEW").innerHTML =
      "🎉You have beaten your previous highscore! Your new highscore is " +
      highscore +
      "🎉";
    setTimeout(function () {
      document.getElementById("highscoreNEW").innerHTML = "";
    }, 2000);
  } else {
    document.getElementById("highscoreValue").innerHTML = highscore;
  }

  symbolOneSpan.innerHTML = " ";
  symbolTwoSpan.innerHTML = " ";
  symbolThreeSpan.innerHTML = " ";
  symbolFourSpan.innerHTML = " ";

  document.getElementById("userInput").style.display = "none";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("timerText").style.display = "none";

  document.getElementById("userInput").removeEventListener("input", game);
}

function timeUp(points) {
  console.log("-----------KONIEC CZASU---------------");
  console.log("punkty ", points, " highscore: ", highscore);

  alert("Time's up!");
  if (points > highscore) {
    highscore = points;
    document.getElementById("highscoreValue").innerHTML = highscore;
    document.getElementById("highscoreNEW").innerHTML =
      "🎉You have beaten your previous highscore! Your new highscore is " +
      highscore +
      "🎉";
    setTimeout(function () {
      document.getElementById("highscoreNEW").innerHTML = "";
    }, 3000);
  } else {
    document.getElementById("highscoreValue").innerHTML = highscore;
  }

  symbolOneSpan.innerHTML = " ";
  symbolTwoSpan.innerHTML = " ";
  symbolThreeSpan.innerHTML = " ";
  symbolFourSpan.innerHTML = " ";

  document.getElementById("userInput").style.display = "none";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("timerText").style.display = "none";

  document.getElementById("userInput").removeEventListener("input", game);
}