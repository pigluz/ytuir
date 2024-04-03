// TODO:
// # Rewrite this whole code
// # Simplify it
// # Add css styling (and maybe animations)
// # Add multiple containers 
//  (for example: When user first visits the webpage, they firstly get the instruction, if user clicks ok, the div dissapears and it's replaced by the game's container.)
// # Add working "cancel" button
// # Add timer

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

function startGame() {
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

function loseGame(points) {
    console.log("-----------KONIEC GRY---------------")
    console.log("punkty ", points, " highscore: ", highscore);

  alert("you lost! try again?");

    if(points > highscore) {
        highscore = points;
        document.getElementById("highscoreValue").innerHTML = highscore;
    } else {
        document.getElementById("highscoreValue").innerHTML = highscore;
    }

  document.getElementById("userInput").style.display = "none";
  document.getElementById("startButton").style.display = "block";

  symbolOneSpan.innerHTML = " ";
  symbolTwoSpan.innerHTML = " ";
  symbolThreeSpan.innerHTML = " ";
  symbolFourSpan.innerHTML = " ";

  document.getElementById("userInput").removeEventListener("input", game)
}

