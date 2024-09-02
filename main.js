const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;

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

function handleClick(event) {
    const cell = event.target;
    const currentClass = isXTurn ? 'X' : 'O';

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw, winner = null) {
    if (draw) {
        winnerMessage.textContent = 'Draw!';
    } else {
        winnerMessage.textContent = `${winner} Wins!`;
    }
    winnerMessage.classList.remove('hidden');
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.classList.add('hidden');
}

restartButton.addEventListener('click', startGame);

startGame();
