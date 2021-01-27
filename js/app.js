const squares = document.querySelector(".squares");
const startBtn = document.querySelector("#startBtn");
const scoreBoard = document.querySelector("#score");
const overlay = document.querySelector(".overlay");
const plyAgainBtn = document.querySelector("#plyAgainBtn");
const finalScore = document.querySelector("#final-score");
let areas = [];
let snake = [2, 1, 0];
const width = 20;
let direction = 1;
let appleIndex = 0;
let score = 0;
let timeInterval = 1000;
let timeInt;

const display = (cb) => {
  scoreBoard.textContent = `Your score: ${score}`;
  for (let i = 0; i < width * width; i++) {
    //   create the element
    const square = document.createElement("div");
    // square.textContent = i;
    // add class to element
    square.classList.add("square");
    // push to squares
    squares.appendChild(square);
    // push to areas
    areas.push(square);
    // display snake on board
  }
  snake.forEach((index) => areas[index].classList.add("snake"));
  cb();
};

const displayOverlay = () => {
  finalScore.textContent = `Your final score: ${score}`;
  overlay.classList.remove("has-fadeOut");
  overlay.classList.add("has-fadeIn");
};

const hideOverlay = () => {
  finalScore.textContent = `Your final score: ${score}`;
  overlay.classList.remove("has-fadeIn");
  overlay.classList.add("has-fadeOut");
};

const startGame = () => {
  // remove all snake class
  snake.forEach((index) => areas[index].classList.remove("snake"));
  // remove apple class
  areas[appleIndex].classList.remove("apple");
  // reset all variable needed
  snake = [2, 1, 0];
  direction = 1;
  appleIndex = 0;
  score = 0;
  timeInterval = 1000;
  // reset the ui display
  scoreBoard.textContent = `Your score: ${score}`;
  // remove all time interval
  clearInterval(timeInt);
  // add new snake array to the display
  snake.forEach((index) => areas[index].classList.add("snake"));
  // generate apple
  generateApple();
  hideOverlay();
  timeInt = setInterval(move, timeInterval);
};

const move = () => {
  // check if it hit the border or not
  if (
    // hit top
    (snake[0] - width < 0 && direction === -width) ||
    // hit the right
    (snake[0] % width === width - 1 && direction === 1) ||
    // hit bottom
    (snake[0] + width >= width * width && direction === width) ||
    // hit left
    (snake[0] % width === 0 && direction === -1) ||
    // hit snake itself
    areas[snake[0] + direction].classList.contains("snake")
  ) {
    displayOverlay();
    return clearInterval(timeInt);
  }
  // pop the tail
  let removedTail = snake.pop();
  //   remove the snake class from pop item
  areas[removedTail].classList.remove("snake");
  // add to the head
  snake.unshift(snake[0] + direction);
  //   add class to the new index
  areas[snake[0]].classList.add("snake");
  console.log(snake);

  // if the snake heads meet the apple
  if (areas[snake[0]].classList.contains("apple")) {
    // remove the apple
    areas[appleIndex].classList.remove("apple");
    // add length to snake display
    areas[removedTail].classList.add("snake");
    // add length to snake array
    snake.push(removedTail);
    // generate new apple
    generateApple();
    // add score
    score++;
    // display to score
    scoreBoard.textContent = `Your score: ${score}`;
    // clear interval
    clearInterval(timeInt);
    // set new timeInterval
    timeInterval = timeInterval - 40;
    // set newInt
    timeInt = setInterval(move, timeInterval);
  }
};

//

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * areas.length);
  } while (areas[appleIndex].classList.contains("snake"));
  areas[appleIndex].classList.add("apple");
}

const control = (event) => {
  if (event.keyCode === 39) {
    // only able to move right when not moving left
    direction !== -1 && (direction = 1);
  } else if (event.keyCode === 40) {
    //  only move down when its not moving up
    direction !== -width && (direction = width);
  } else if (event.keyCode === 37) {
    //   only move left when its not moving right
    direction !== 1 && (direction = -1);
  } else if (event.keyCode === 38) {
    //   only move up when its not moving down
    direction !== width && (direction = -width);
  }
};

window.addEventListener("DOMContentLoaded", () => display(generateApple));
document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
plyAgainBtn.addEventListener("click", startGame);
