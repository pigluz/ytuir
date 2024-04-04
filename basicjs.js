// TODO:
// # Rewrite this whole code
// # Simplify it
// # Add css styling (and maybe animations) // kinda ✔
// # Add multiple containers 
//  (for example: When user first visits the webpage, they firstly get the instruction, if user clicks ok, the div dissapears and it's replaced by the game's container.)  ✔
// # Add working "cancel" button
// # Add timer  ✔

const symbols = ["↑", "↓", "←", "→"];

var points = 0;
let highscore = 0;

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
    console.log("Wartość UserInputValue w funkcji ConvertToSymbols(): ", userInputValue)

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

var appendSeconds = document.getElementById("seconds");
var appendTens = document.getElementById("tens");

let time;

function introductionOK() {
  document.getElementById("introduction_container").style.display = "none";
  document.getElementById("game_container").style.display = "block";
}
function startGame() {
  document.getElementById("highscoreNEW").innerHTML = ""
  timeleft = 10;
  document.getElementById("highscore").style.display = "block";
  document.getElementById("timerText").style.display = "block";
  document.getElementById("time").innerHTML = timeleft;
  console.log("-----------START GRY---------------");
  points = 0;
  console.log("Początkowe punkty: ", points)

  document.getElementById("pointsValue").innerHTML = points;
  document.getElementById("pointsText").style.display = "block";
  document.getElementById("startButton").style.display = "none";
  document.querySelector("input").style.display = "block";

  symbolOneSpan.innerHTML = ` ${symbolOne} `;
  symbolTwoSpan.innerHTML = ` ${symbolTwo} `;
  symbolThreeSpan.innerHTML = ` ${symbolThree} `;
  symbolFourSpan.innerHTML = ` ${symbolFour} `;

  document.getElementById("userInput").addEventListener("input", game)
  time = setTimeout(timer, 12000);
  var countdownTimer;
  countdownTimer = setInterval(function() {
    if (timeleft <= 0) {
      clearInterval(countdownTimer);
    }
    document.getElementById("time").innerHTML = timeleft;
    timeleft--;
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
      console.log(points);

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
  timeUp(points);
}

function loseGame(points) {
    console.log("-----------KONIEC GRY---------------")
    console.log("punkty ", points, " highscore: ", highscore);

  alert("You pressed the wrong button! You lost!");

    if(points > highscore) {
        highscore = points;
        document.getElementById("highscoreValue").innerHTML = highscore;
        document.getElementById("highscoreNEW").innerHTML = "🎉You have beaten your previous highscore! Your new highscore is " + highscore + "🎉"
        setTimeout(function() {document.getElementById("highscoreNEW").innerHTML = ""}, 2000);
    } else {
        document.getElementById("highscoreValue").innerHTML = highscore;
    }

  document.getElementById("userInput").style.display = "none";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("timerText").style.display = "none";

  symbolOneSpan.innerHTML = " ";
  symbolTwoSpan.innerHTML = " ";
  symbolThreeSpan.innerHTML = " ";
  symbolFourSpan.innerHTML = " ";

  document.getElementById("userInput").removeEventListener("input", game);
  clearTimeout(time);
}

function timeUp(points) {
  console.log("-----------KONIEC CZASU---------------")
  console.log("punkty ", points, " highscore: ", highscore);

  alert("Time's up!");
  if(points > highscore) {
    highscore = points;
    document.getElementById("highscoreValue").innerHTML = highscore;
    document.getElementById("highscoreNEW").innerHTML = "🎉You have beaten your previous highscore! Your new highscore is " + highscore + "🎉"
    setTimeout(function() {document.getElementById("highscoreNEW").innerHTML = ""}, 3000);
} else {
    document.getElementById("highscoreValue").innerHTML = highscore;
}

document.getElementById("userInput").style.display = "none";
document.getElementById("startButton").style.display = "block";
document.getElementById("timerText").style.display = "none";

symbolOneSpan.innerHTML = " ";
symbolTwoSpan.innerHTML = " ";
symbolThreeSpan.innerHTML = " ";
symbolFourSpan.innerHTML = " ";

document.getElementById("userInput").removeEventListener("input", game)
clearTimeout(time);
}
