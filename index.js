const symbols = ["↑", "↓", "←", "→"];

var points = 0;
var highscore = 0;

var timeLeft = 10;
var countdownTimer;

let symbolOneSpan = document.getElementById("span_symbol_one");
let symbolTwoSpan = document.getElementById("span_symbol_two");
let symbolThreeSpan = document.getElementById("span_symbol_three");
let symbolFourSpan = document.getElementById("span_symbol_four")

let introContainer = document.getElementById("intro_container");
let gameContainer = document.getElementById("game_container");
let onGoingGameArea = document.getElementById("ongoing_game");
let pointsContainer = document.getElementById("points_container");

let symbolOne = symbols[Math.floor(Math.random() * 4)];
let symbolTwo = symbols[Math.floor(Math.random() * 4)];
let symbolThree = symbols[Math.floor(Math.random() * 4)];
let symbolFour = symbols[Math.floor(Math.random() * 4)];

function userInputConvertToSymbol() {
    let userInput = document.getElementById("user_input").value.toLowerCase();
    switch(userInput) {
        case "a":
            return "←";
        case "w":
            return "↑";
        case "s":
            return "↓";
        case "d":
            return "→";
        default:
            return "WRONG INPUT";
    }
}

function introAcknowledged() {
    introContainer.style.display = "none";
    gameContainer.style.display = "block";
    onGoingGameArea.style.display = "none";
}

function gameStart() {
    onGoingGameArea.style.display = "block";
    pointsContainer.style.display = "block";
    document.getElementById("startGameButton").style.display = "none";

    document.getElementById("user_input").focus();

    symbolOneSpan.innerHTML = ` ${symbolOne} `;
    symbolTwoSpan.innerHTML = ` ${symbolTwo} `;
    symbolThreeSpan.innerHTML = ` ${symbolThree} `;
    symbolFourSpan.innerHTML = ` ${symbolFour} `;

    timeLeft = 10;
    points = 0;

    document.getElementById("pointsValue").innerHTML = points;
    document.getElementById("timer").innerHTML = timeLeft;

    document.getElementById("user_input").addEventListener("input", game);

    countdownTimer = setInterval(function() {
        timeLeft--;
        if(timeLeft < 0) {
            timesUp(points);
        } document.getElementById("timer").innerHTML = timeLeft;
    }, 1000);
}

function game() {
    let rndIndex = Math.floor(Math.random() * 4);
    let userInput = userInputConvertToSymbol();

    // document.getElementById("user_input") => this;
    this.value = ""; 
    this.innerHTML = "";

    if (symbolOne == userInput) {
        points++;

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
        gameOver(points);
    }
}

function timesUp(points) {
    alert("Time's up!");
    gameResults(points);
}

function gameOver(points) {
    alert("You pressed the wrong button!\nYou lost!");
    gameResults(points);
}

function gameResults(points) {
    clearInterval(countdownTimer);
    if (points > highscore) {
        highscore = points;
        document.getElementById("highscoreValue").innerHTML = highscore;
        let newHighscore = document.createElement("p");
        newHighscore.innerHTML =
        `🎉You have beaten your previous highscore! Your new highscore is ${highscore}! 🎉`
        pointsContainer.appendChild(newHighscore);

        setTimeout(function() {
            pointsContainer.removeChild(newHighscore);
        }, 3000)
    } else {
        document.getElementById("highscoreValue").innerHTML = highscore;
    }

    symbolOneSpan.innerHTML = " ";
    symbolTwoSpan.innerHTML = " ";
    symbolThreeSpan.innerHTML = " ";
    symbolFourSpan.innerHTML = " ";

    onGoingGameArea.style.display = "none";
    document.getElementById("startGameButton").style.display = "block";
    document.getElementById("user_input").removeEventListener("input", game);
}