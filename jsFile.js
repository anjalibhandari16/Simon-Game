const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;

// Sounds for each box
const sounds = {
    green: new Audio('./AudioFiles/green_sound.mp3'),
    red: new Audio('./AudioFiles/red_sound1.mp3'),
    yellow: new Audio('./AudioFiles/yellow_sound.mp3'),
    blue: new Audio('./AudioFiles/blue_sound.mp3'),
  };

// Select elements
const startButton = document.getElementById('start-button');
const buttons = document.querySelectorAll('.simon-button');
const statusText = document.getElementById('status');

// Helper function to flash a button (glow effect) and play sound
function flashButton(color) {
  const button = document.querySelector(`.simon-button.${color}`);
  button.classList.add('active');
  sounds[color].currentTime = 0; // Reset the sound to the start
  sounds[color].play(); // Play the sound
  setTimeout(() => button.classList.remove('active'), 500);
}

// Show the new color for the current level
function showCurrentLevelColor() {
  const newColor = gameSequence[gameSequence.length - 1];
  flashButton(newColor);
}

// Generate the next color in the sequence
function nextSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  setTimeout(showCurrentLevelColor, 1000); // Show the color
  level++;
  statusText.textContent = `Level ${level}`;
}

// Check the player's input
function checkPlayerSequence() {
  const isCorrect = playerSequence.every((color, index) => color === gameSequence[index]);

  if (!isCorrect) {
    statusText.textContent = 'Game Over! Press Start to try again.';
    gameSequence = [];
    level = 0;
  } else if (playerSequence.length === gameSequence.length) {
    playerSequence = [];
    setTimeout(nextSequence, 1000);
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.dataset.color;
    if (gameSequence.length > 0) {
      playerSequence.push(color);
      flashButton(color); // Glow and sound on click
      checkPlayerSequence();
    }
  });
});

// Starting the game
startButton.addEventListener('click', () => {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  // statusText.textContent = 'Game Started!';
  nextSequence();
});

console.log(level,'level');