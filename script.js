let board = Array(9).fill(null);  // 9 cells to track state
let currentPlayer = 'X';  // Player 1 starts as 'X'
let gameActive = true;
let gameMode = 'PvP';  // Default mode is Player vs Player

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]  // Diagonals
];

function handleClick(index) {
  if (!gameActive || board[index]) return;  // Ignore clicks on filled cells or if game over

  board[index] = currentPlayer;
  document.getElementById(`cell-${index}`).innerText = currentPlayer;

  if (checkWin()) {
    document.getElementById('status').innerText = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    document.getElementById('status').innerText = 'It\'s a tie!';
    gameActive = false;
  } else {
    switchPlayer();
    if (gameMode === 'PvC' && currentPlayer === 'O') {
      computerMove();  // Trigger computer move if it's AI's turn
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => (cell.innerText = ''));
  document.getElementById('status').innerText = 'Player X\'s turn';
}

function setMode(mode) {
  gameMode = mode;
  restartGame();
}

function computerMove() {
  let availableCells = board
    .map((value, index) => value === null ? index : null)
    .filter(value => value !== null);
  
  let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  handleClick(randomIndex);
}
