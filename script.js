const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (gameBoard[cellIndex] !== "" || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        showResult(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        showResult("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinnerCells([a, b, c]);
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== "");
}

function highlightWinnerCells(cellsToHighlight) {
    for (const index of cellsToHighlight) {
        cells[index].classList.add("winner");
    }
}

function showResult(message) {
    status.textContent = message;
    setTimeout(() => {
        status.textContent = "";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
    }, 1500);
}

function handleResetButtonClick() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
    status.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleResetButtonClick);
