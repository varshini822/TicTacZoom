const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let isGameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Create cells
function createBoard() {
  board.innerHTML = '';
  gameBoard.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!isGameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    statusText.textContent = `🤝 It's a Draw!`;
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = Array(9).fill('');
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
}

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);

createBoard();
