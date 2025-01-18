// Preload audio files
const hoverSound = new Audio("sounds/hover.mp3");
const clickSound = new Audio("sounds/click.mp3");
const startGameSound = new Audio("sounds/start-game.mp3");
const selectBallSound = new Audio("sounds/select-ball.mp3");
const gameOverSound = new Audio("sounds/game-over.mp3");

// Reference to the canvas and popup
const canvas = document.getElementById("beachGameCanvas");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("gamePopup");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let score = 0;

// Check if the device is mobile
const isMobile = window.innerWidth <= 768;

// Function to create a new ball
function createBall() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    radius: isMobile ? 30 : 40, // Slightly smaller radius for mobile
    speed: isMobile ? 2 + Math.random() * 1.5 : 2 + Math.random() * 2, // Adjusted speed for mobile
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
}

// Function to draw a ball
function drawBall(ball) {
  const colors = ["#FF5733", "#FFC300", "#3498DB", "#DAF7A6"];

  // Draw the white base
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();

  // Draw the colored segments
  const segmentCount = 4;
  for (let i = 0; i < segmentCount; i++) {
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.arc(
      ball.x,
      ball.y,
      ball.radius,
      (i * Math.PI) / 2,
      ((i + 1) * Math.PI) / 2
    );
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.closePath();
  }

  // Draw the center circle
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the scorecard
function drawScoreCard() {
  // Draw a scorecard background
  ctx.fillStyle = "#282c34"; // Dark background color
  ctx.fillRect(10, 10, isMobile ? 150 : 200, 50); // Adjusted width for mobile

  // Add a border for the scorecard
  ctx.strokeStyle = "#ffffff"; // White border color
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, isMobile ? 150 : 200, 50);

  // Add score text
  ctx.fillStyle = "#ffffff"; // White text color
  ctx.font = isMobile ? "16px Arial" : "20px Arial"; // Smaller font on mobile
  ctx.fillText("Score: " + score, 20, 40);

  // Draw the progress strip
  const barX = 10; // X position of the bar
  const barY = 70; // Y position of the bar
  const totalWidth = isMobile ? 150 : 200; // Adjusted for mobile
  const barHeight = 10; // Height of the progress bar

  // Draw the background bar
  ctx.fillStyle = "#333333"; // Gray background
  ctx.fillRect(barX, barY, totalWidth, barHeight);

  // Draw the filled progress portion
  const progressWidth = Math.min(score / 3, 1) * totalWidth; // Scale based on score
  ctx.fillStyle = "#00ff00"; // Green color
  ctx.fillRect(barX, barY, progressWidth, barHeight);

  // Draw balls on top of the progress strip
  const totalBalls = 3; // Number of balls
  const ballSpacing = totalWidth / totalBalls; // Spacing between balls
  for (let i = 0; i < totalBalls; i++) {
    const ballX = barX + ballSpacing * i + ballSpacing / 2; // Center balls evenly
    const ballY = barY - 10; // Position balls slightly above the strip
    ctx.beginPath();
    ctx.arc(ballX, ballY, isMobile ? 6 : 8, 0, Math.PI * 2); // Adjusted ball size for mobile
    ctx.fillStyle = i < score ? "#ffcc00" : "#555555"; // Highlight based on score
    ctx.fill();
  }
}

// Function to update the game
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update balls
  balls.forEach((ball, index) => {
    ball.y += ball.speed;
    drawBall(ball);

    // Remove balls that fall out of the screen
    if (ball.y - ball.radius > canvas.height) {
      balls.splice(index, 1);
    }
  });

  // Create new balls randomly
  if (Math.random() < 0.02) balls.push(createBall());

  // Draw the scorecard
  drawScoreCard();

  requestAnimationFrame(update);
}

// Handle ball clicks
canvas.addEventListener("click", (e) => {
  balls.forEach((ball, index) => {
    const dx = e.clientX - ball.x;
    const dy = e.clientY - ball.y;
    if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
      balls.splice(index, 1);
      score++;
      selectBallSound.play(); // Play ball selection sound
    }
  });

  // Show popup after reaching 3 points
  if (score >= 3) {
    canvas.style.display = "none";
    popup.style.display = "block";
    gameOverSound.play(); // Play game over sound
  }
});

// Start the game loop
startGameSound.play(); // Play sound when game starts
update();
