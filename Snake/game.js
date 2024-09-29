let board = [];
let snake = [{ x: 5, y: 5 }];
let food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) };
let direction = 'right';
let isGameStarted = false;
let score = 0;

function setupBoard()
{
  for (let i = 0; i < 30; i++) 
  {
    board[i] = [];
    for (let j = 0; j < 30; j++) 
    {
        board[i][j] = false;
    }
  }
}

function resetGame() 
{
  snake = [{ x: 5, y: 5 }];
  food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) };
  direction = 'right';
  score = 0;
  isGameStarted = false;
  document.getElementById('message').style.display = 'none';
  document.getElementById('score').textContent = `Puntos: ${score}`;
  setupBoard();
  drawBoard();
}

function drawBoard() 
{
  document.getElementById('board').innerHTML = '';
  for (let i = 0; i < 30; i++) 
  {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 30; j++) 
    {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      if (snake.find(s => s.x === j && s.y === i)) 
      {
        cell.style.backgroundColor = 'green'; // Dibuja la serpiente
      } 
      else if (food.x === j && food.y === i) 
      {
        cell.style.backgroundColor = 'red'; // Dibuja la comida
      }
      row.appendChild(cell);
    }
    document.getElementById('board').appendChild(row);
  }
}

function moveSnake() 
{
  if (!isGameStarted) return;

  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) 
  {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }

  if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || snake.find(segment => segment.x === head.x && segment.y === head.y)) 
  {
    document.getElementById('message').style.display = 'block'; // Mostrar "Has muerto"
    isGameStarted = false;
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) 
  {
    score += 10;
    document.getElementById('score').textContent = `Puntos: ${score}`;
    food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) };
  } 
  else 
  {
    snake.pop();
  }
}

function gameLoop() 
{
  if (isGameStarted) 
  {
    moveSnake();
    drawBoard();
    setTimeout(gameLoop, 100);
  }
}

setupBoard();
drawBoard();

document.getElementById('start-btn').addEventListener('click', function () 
{
  resetGame();
  isGameStarted = true;
  gameLoop();
});

document.addEventListener('keydown', function (event) 
{
  if (isGameStarted) 
  {
    switch (event.keyCode) 
    {
      case 37:
        if (direction !== 'right') direction = 'left';
        break;
      case 38:
        if (direction !== 'down') direction = 'up';
        break;
      case 39:
        if (direction !== 'left') direction = 'right';
        break;
      case 40:
        if (direction !== 'up') direction = 'down';
        break;
    }
  }
});
