const canvas = document.getElementById("beachGameCanvas");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("gamePopup");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let score = 0;

function createBall() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    radius: 40,
    speed: 1 + Math.random() * 1,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
}

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

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball, index) => {
    ball.y += ball.speed;
    drawBall(ball);

    // Remove balls that fall out of the screen
    if (ball.y - ball.radius > canvas.height) {
      balls.splice(index, 1);
    }
  });

  if (Math.random() < 0.02) balls.push(createBall());

  // Display Score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(update);
}

canvas.addEventListener("click", (e) => {
  balls.forEach((ball, index) => {
    const dx = e.clientX - ball.x;
    const dy = e.clientY - ball.y;
    if (Math.sqrt(dx * dx + dy * dy) < ball.radius) {
      balls.splice(index, 1);
      score++;
    }
  });

  // Show popup after reaching 10 points
  if (score >= 3) {
    canvas.style.display = "none";
    popup.style.display = "block";
  }
});

update();
