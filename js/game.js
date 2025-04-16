// ========================
// Chicken Game with Shooting
// ========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

export let currentFireKey = null;
let remainingTime = 30;
let gameOver = false;
let score = 0;
let gameTime = 30; // seconds

// Load images
const bgImage = new Image();
bgImage.src = "assets/images/bg.png";

const heroImage = new Image();
heroImage.src = "assets/images/chicken.png";

const monsterImage = new Image();
monsterImage.src = "assets/images/kfc.png";

// Hero object (the chicken)
const hero = {
  x: 100,
  y: canvas.height * 0.7,
  width: 32,
  height: 32,
  speed: 5
};

// Bullets array and bullet settings
let bullets = [];
const BULLET_SPEED = 8;
const BULLET_RADIUS = 5;

// Monsters grid settings
const monsters = [];
const rows = 4;
const cols = 5;
const monsterSpacing = 10;
const monsterWidth = 42;
const monsterHeight = 42;
let monsterDirection = 1;
const monsterSpeed = 1;

// Initialize monsters in a 5x4 grid at the top
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    monsters.push({
      x: col * (monsterWidth + monsterSpacing),
      y: row * (monsterHeight + monsterSpacing),
      width: monsterWidth,
      height: monsterHeight
    });
  }
}

// Exported game start function
export function initGame(settings) {
  const { fireKey, gameDuration } = settings;
  console.log("Game starting with:", fireKey, gameDuration);
  currentFireKey = fireKey;
  remainingTime = gameDuration * 60;
  gameTime = gameDuration * 60;
  gameOver = false;
  bullets = [];
  score = 0;
  startTimer();
  loop();
}

// Key press tracking
const keys = {};
document.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (e.code === currentFireKey) {
    shoot();
  }
});
document.addEventListener("keyup", e => delete keys[e.key]);

// Shooting function
function shoot() {
  if (gameOver) return;
  bullets.push({
    x: hero.x + hero.width / 2,
    y: hero.y,
    radius: BULLET_RADIUS,
    speed: BULLET_SPEED
  });
}

// Main game update logic
function update() {
  if (gameOver) return;

  const bottomLimit = canvas.height;
  const topLimit = canvas.height * 0.6;

  // Movement controls
  if (keys["ArrowUp"] && hero.y > topLimit) hero.y -= hero.speed;
  if (keys["ArrowDown"] && hero.y < bottomLimit - hero.height) hero.y += hero.speed;
  if (keys["ArrowLeft"] && hero.x > 0) hero.x -= hero.speed;
  if (keys["ArrowRight"] && hero.x < canvas.width - hero.width) hero.x += hero.speed;

  // Move all monsters left/right
  let hitEdge = false;
  monsters.forEach(monster => {
    monster.x += monsterDirection * monsterSpeed;
    if (monster.x <= 0 || monster.x + monster.width >= canvas.width) {
      hitEdge = true;
    }
  });
  if (hitEdge) monsterDirection *= -1;

  // Bullets movement and collision
  bullets.forEach((bullet, bIndex) => {
    bullet.y -= bullet.speed;

    if (bullet.y + bullet.radius < 0) {
      bullets.splice(bIndex, 1);
      return;
    }

    monsters.forEach((monster, mIndex) => {
      const dx = bullet.x - (monster.x + monster.width / 2);
      const dy = bullet.y - (monster.y + monster.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < monster.width / 2 + bullet.radius) {
        score++;
        monsters[mIndex] = {}
        bullets.splice(bIndex, 1);
      }
    });
  });

  // Collision with monsters
  monsters.forEach(monster => {
    const dx = (hero.x + hero.width / 2) - (monster.x + monster.width / 2);
    const dy = (hero.y + hero.height / 2) - (monster.y + monster.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 32) {
      score++;
      monster.x = Math.random() * (canvas.width - monster.width);
      monster.y = Math.random() * (canvas.height * 0.5 - monster.height);
    }
  });
}

// Drawing logic
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bgImage.complete) ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  monsters.forEach(monster => {
    if (monsterImage.complete) {
      ctx.drawImage(monsterImage, monster.x, monster.y, monster.width, monster.height);
    }
  });

  if (heroImage.complete) {
    ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
  }

  // Draw bullets
  ctx.fillStyle = "red";
  bullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score + " | Time left: " + Math.ceil(gameTime / 60), 20, 30);

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  if (!gameOver) {
    requestAnimationFrame(loop);
  }
}

function startTimer() {
  const timer = setInterval(() => {
    gameTime--;
    if (gameTime <= 0) {
      clearInterval(timer);
      gameOver = true;
    }
  }, 1000);
}
