$(window).load(function () {
	var cell;
	for (var i = 1; i < 10; i++) {
		cell = "cell-" + i;
		document.getElementsByClassName(cell)[0].setAttribute("data-cell", i-1);
	}
});

var gameOver;
var currBoardValues;
var isPlayerOneTurn;
var gameResultMessage;

var playerOneRowScore;
var playerOneColScore;
var playerOneDiagScore;

var playerTwoRowScore;
var playerTwoColScore;
var playerTwoDiagScore;

function init() {
	// initialise flags, board values, player scores
	gameOver = false;
	isPlayerOneTurn = true;
	currBoardValues = new Array(9);
	for (var i = 0; i < 9; i++) {
		currBoardValues[i] = "";
	}

	playerOneRowScore = new Array(3);
	playerOneColScore = new Array(3);
	playerOneDiagScore = new Array(2);

	playerTwoRowScore = new Array(3);
	playerTwoColScore = new Array(3);
	playerTwoDiagScore = new Array(2);

	for (var i = 0; i < 3; i++) {
		playerOneRowScore[i] = 0;
		playerOneColScore[i] = 0;
		playerTwoRowScore[i] = 0;
		playerTwoColScore[i] = 0;
	}
	for (var i = 0; i < 2; i++) {
		playerOneDiagScore[i] = 0;
		playerTwoDiagScore[i] = 0;
	}
}

$(".cell").click(function() {
	if (isPlayerOneTurn) {
		if ($(this).hasClass("clicked")) {
			if (!gameOver) {
				document.getElementById("error").style.visibility = "visible";
			}
		} else {
			document.getElementById("error").style.visibility = "hidden";
			$(this).addClass("clicked");

			if (!gameOver) {
				this.innerHTML = "X";
				this.className += " zoomOut";	// for text fly into screen effect
				var cellNumber = this.getAttribute("data-cell");
				
				playerOneRowScore[Math.floor(cellNumber/3)] += 1;
				playerOneColScore[cellNumber%3] += 1;
				if (cellNumber == 0 || cellNumber == 4 || cellNumber == 8) {
					playerOneDiagScore[0] += 1;
				}
				if (cellNumber == 2 || cellNumber == 4 || cellNumber == 6) {
					playerOneDiagScore[1] += 1;
				}

				currBoardValues[cellNumber] = "X";
				checkWinCondition();
				isPlayerOneTurn = false;
			}
		}
	} else {
		if ($(this).hasClass("clicked")) {
			if (!gameOver) {
				document.getElementById("error").style.visibility = "visible";
			}
		} else {
			document.getElementById("error").style.visibility = "hidden";
			$(this).addClass("clicked");

			if (!gameOver) {
				this.innerHTML = "O";
				this.className += " zoomOut";
				var cellNumber = this.getAttribute("data-cell");

				playerTwoRowScore[Math.floor(cellNumber/3)] += 1;
				playerTwoColScore[cellNumber%3] += 1;
				if (cellNumber == 0 || cellNumber == 4 || cellNumber == 8) {
					playerTwoDiagScore[0] += 1;
				}
				if (cellNumber == 2 || cellNumber == 4 || cellNumber == 6) {
					playerTwoDiagScore[1] += 1;
				}

				currBoardValues[cellNumber] = "O";
				checkWinCondition();
				isPlayerOneTurn = true;
			}
			
		}
	}
});

function checkWinCondition() {
	if (checkRowAndColScore(playerOneRowScore, 3) || checkRowAndColScore(playerOneColScore, 3) ||
	 checkDiagScore(playerOneDiagScore, 3)) {
	 	document.getElementById("winner").className = "alert alert-success";
		gameResultMessage = "Player X is the winner!";
		showWinner();
	} else if (checkRowAndColScore(playerTwoRowScore, 3) || checkRowAndColScore(playerTwoColScore, 3) ||
	 checkDiagScore(playerTwoDiagScore, 3)) {
	 	document.getElementById("winner").className = "alert alert-success";
		gameResultMessage = "Player O is the winner!";
		showWinner();
	}
	// If there are no more empty cells, it is a draw
	else if ($.inArray("", currBoardValues) == -1) {
		document.getElementById("winner").className = "alert alert-info";
		gameResultMessage = "It's a draw!";
		showWinner();
	}
	
}

function showWinner() {
	gameOver = true;
	document.getElementById("winner").innerHTML = gameResultMessage;
	document.getElementById("result").style.visibility = "visible";
}

function checkRowAndColScore(playerScore, scoreToCheck) {
	for (var i = 0; i < 3; i++) {
		if (playerScore[i] == scoreToCheck) {
			return true;
		}
	}
	return false;
}

function checkDiagScore(playerScore, scoreToCheck) {
	for (var i = 0; i < 2; i++) {
		if (playerScore[i] == scoreToCheck) {
			return true;
		}
	}
	return false;
}

function clearBoard() {
	var cell = document.getElementsByClassName("cell");
	for (var i = 0; i < cell.length; i++) {
		while(cell[i].firstChild) {
			cell[i].removeChild(cell[i].firstChild);
		}
	}
}


document.getElementById("play-again").onclick = function() {
	clearBoard();
	document.getElementById("winner").className = "";
	document.getElementById("result").style.visibility = "hidden";
	$(".cell").removeClass("clicked");
	init();
	
}

init();