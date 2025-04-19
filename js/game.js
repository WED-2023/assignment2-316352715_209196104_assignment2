
const canvas = document.getElementById("gameCanvas");
canvas.width = Math.min(window.innerWidth * 0.7, 720);  // לדוגמה: 70% מהמסך, מקסימום 720
canvas.height = canvas.width * 0.75; // יחס 4:3
const ctx = canvas.getContext("2d");


export let currentFireKey = null;
let remainingTime = 30;
let gameOver = false;
let score = 0;
let gameTime = 30; // seconds
let heroLives = 3; // chicken has initial 3 lives until game over
let isCanDoBetter = false; // if time's up and less then 100
let isWinner = false; // if time's up and more then 100
let isLoser=false; // if got killed
let isChampion = false; //if kill them all
let timeUp=false;
let gameLoopRunning = false;

let scoreSaved = false; //monitor if we saved the score

let monsterSpeed = 1;
let ENEMY_BULLET_SPEED = 3;
let increaseTimes = 4;
let speedInterval = null;
let timerInterval = null;

// Load images
const bgImage = new Image();
bgImage.src = "assets/images/bg.png";

const heroImage = new Image();
heroImage.src = "assets/images/chicken.png";

const monsterImage = new Image();
monsterImage.src = "assets/images/kfc.png";

const heartImage = new Image();
heartImage.src = "assets/images/heart.png";

//Load sounds
const gameSong = new Audio("assets/sounds/gameSong.mp3");
gameSong.loop = true; 

const gameOverSong = new Audio("assets/sounds/game-over-arcade-6435.mp3");
const gameWinSong = new Audio("assets/sounds/gameWon.mp3");
const enemyShootMp3 = new Audio("assets/sounds/enemyShot.mp3");
const heroShootMp3 = new Audio("assets/sounds/heroShot.mp3");

// Hero object (the chicken)
const hero = {
  x: 100,
  y: canvas.height * 0.7,
  width: 32,
  height: 32,
  speed: 5
};

// Bullets
let bullets = [];
const BULLET_SPEED = 8;
const BULLET_RADIUS = 5;

// Enemy bullets
let enemyBullets = [];
const ENEMY_BULLET_RADIUS = 5;
let lastEnemyShooterIndex = null;

// Monsters
let monsters = [];
const rows = 4;
const cols = 5;
const monsterSpacing = 10;
const monsterWidth = 32;
const monsterHeight = 32;
let monsterDirection = 1;

function initMonsters() {
  monsters = [];

  const totalWidth = cols * monsterWidth + (cols - 1) * monsterSpacing;
  const totalHeight = rows * monsterHeight + (rows - 1) * monsterSpacing;

  const startX = (canvas.width - totalWidth) / 2;  // 📦 מתחילים מהמרכז ולא מהשוליים
  const startY = 50; // מרחק מהחלק העליון

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      monsters.push({
        x: startX + col * (monsterWidth + monsterSpacing),
        y: startY + row * (monsterHeight + monsterSpacing),
        width: monsterWidth,
        height: monsterHeight
      });
    }
  }
}


export function initGame(settings) {
  gameSong.currentTime = 0;
  gameSong.play();
  const { fireKey, gameDuration } = settings;
  currentFireKey = fireKey;
  remainingTime = gameDuration * 60;
  gameTime = gameDuration * 60;
  gameOver = false;
  bullets = [];
  enemyBullets = [];
  score = 0;
  heroLives = 3;
  monsterSpeed = 1;
  ENEMY_BULLET_SPEED = 3;
  increaseTimes = 4;
  clearInterval(speedInterval); // עוצר את הריצה הקודמת אם הייתה
  scoreSaved = false;
  initMonsters();
  monsterDirection = 1; // תמיד להתחיל ימינה


  // ✅ זהו הסט אינטרוול הנקי והמוגן
  speedInterval = setInterval(() => {
    if (increaseTimes > 0) {
      monsterSpeed += 5;
      ENEMY_BULLET_SPEED += 5;
      increaseTimes--;
    } else {
      clearInterval(speedInterval); // 🔥 חשוב: לעצור ברגע שגמרנו
    }
  }, 5000);

  startTimer();
  setTimeout(() => {
    if (!gameOver) {
      gameLoopRunning = true;
      loop();
    }
  }, 100);
  
}


const keys = {};
document.addEventListener("keydown", e => {
  if (e.code === currentFireKey) {
    e.preventDefault(); 
    shoot();
  }
  keys[e.key] = true;
});
document.addEventListener("keyup", e => delete keys[e.key]);

function shoot() {
  if (gameOver) return;
  heroShootMp3.play();
  bullets.push({
    x: hero.x + hero.width / 2,
    y: hero.y,
    radius: BULLET_RADIUS,
    speed: BULLET_SPEED
  });
}

function enemyShoot() {
  if (gameOver || monsters.length === 0) return;
  if (enemyBullets.length > 0) {
    const bullet = enemyBullets[enemyBullets.length - 1];
    if (bullet.y < canvas.height * 0.75) return;
  }
  const randomIndex = Math.floor(Math.random() * monsters.length);
  const shooter = monsters[randomIndex];
  lastEnemyShooterIndex = randomIndex;
  enemyBullets.push({
    x: shooter.x + shooter.width / 2,
    y: shooter.y + shooter.height,
    radius: ENEMY_BULLET_RADIUS,
    speed: ENEMY_BULLET_SPEED
  });
  enemyShootMp3.play();
}

function update() {
  if (gameOver) return;

  const bottomLimit = canvas.height;
  const topLimit = canvas.height * 0.6;

  if (keys["ArrowUp"] && hero.y > topLimit) hero.y -= hero.speed;
  if (keys["ArrowDown"] && hero.y < bottomLimit - hero.height) hero.y += hero.speed;
  if (keys["ArrowLeft"] && hero.x > 0) hero.x -= hero.speed;
  if (keys["ArrowRight"] && hero.x < canvas.width - hero.width) hero.x += hero.speed;

  let hitEdge = false;
  monsters.forEach(monster => {
    monster.x += monsterDirection * monsterSpeed;
    if (monster.x <= 0 || monster.x + monster.width >= canvas.width) {
      hitEdge = true;
    }
  });
  if (hitEdge) monsterDirection *= -1;

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
        if (mIndex <= 4) score += 20;
        else if (mIndex <= 9) score += 15;
        else if (mIndex <= 14) score += 10;
        else if (mIndex <= 19) score += 5;
        monsters.splice(mIndex, 1);
        bullets.splice(bIndex, 1);
        if (monsters.length === 0) {
          gameOver = true;
          isChampion = true;
          return;
        }
      }
    });
  });

  enemyBullets.forEach((bullet, index) => {
    bullet.y += bullet.speed;
    if (bullet.y > canvas.height) {
      enemyBullets.splice(index, 1);
      return;
    }
    const dx = bullet.x - (hero.x + hero.width / 2);
    const dy = bullet.y - (hero.y + hero.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < hero.width / 2 + bullet.radius) {
      enemyBullets.splice(index, 1);
      heroLives--;
      if (heroLives === 0) {
        isLoser=true;
        isChampion=false;
        isCanDoBetter=false
        isWinner=false;
        gameOver = true;
      }
    }
  });

  enemyShoot();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (bgImage.complete) ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  monsters.forEach(monster => {
    if (monsterImage.complete) ctx.drawImage(monsterImage, monster.x, monster.y, monster.width, monster.height);
  });
  if (heroImage.complete) ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
  ctx.fillStyle = "red";
  bullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "yellow";
  enemyBullets.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score + " | Time left: " + Math.ceil(gameTime) + " seconds", 20, 30);
  for (let i = 0; i < heroLives; i++) {
    if (heartImage.complete) {
      ctx.drawImage(heartImage, 20 + i * 40, 60, 30, 30);
    }
  }
  if (gameOver) {
    gameSong.pause();
    if (!scoreSaved) {
      scoreSaved = true;
      const { scores, rank } = saveScore();
      showScoresTable(scores, rank); // ⏱️ מידית ללא setTimeout
    }
    
  
    // 🧼 אפס את כל הדגלים
    isCanDoBetter = false;
    isWinner = false;
    isLoser = false;
  
    // אל תאפס את isChampion כאן — הוא נקבע כבר כשנגמרו כל המפלצות!
  
    if (!isChampion && timeUp) {
      if (score >= 100) {
        isWinner = true;
      } else {
        isCanDoBetter = true;
      }
    }
  
    // 🎯 תוצאה
    if (isChampion) {
      gameWinSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("Champion!", canvas.width / 2 - 120, canvas.height / 2);
    } else if (isWinner) {
      gameWinSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("Winner!", canvas.width / 2 - 120, canvas.height / 2);
    } else if (isCanDoBetter) {
      gameOverSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("You can do better. Your score: " + score, canvas.width / 2 - 120, canvas.height / 2);
    } else {
      gameOverSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("You Lost", canvas.width / 2 - 120, canvas.height / 2);
    }
  }
  
  
}

function saveScore() { 
  const username = sessionStorage.getItem("username") || "Guest";
  const key = `scores_${username}`;
  let scores = JSON.parse(localStorage.getItem(key)) || [];

  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 10); // ✅ שומר רק 10 הכי גבוהים

  localStorage.setItem(key, JSON.stringify(scores));
  return { scores, rank: scores.indexOf(score) + 1 };
}

export function showScoresTable(scores, rank) {
  const panel = document.getElementById("highScoresBox");
  if (!panel) return;

  panel.innerHTML = `
    <h3>🏆 Your Scores</h3>
    <ol>${scores.map((s, i) => `<li>${s}${i + 1 === rank ? " ← Last Game" : ""}</li>`).join('')}</ol>
    <p>Your rank: #${rank}</p>
  `;

  panel.classList.remove("hidden");
  panel.classList.add("visible");


}




function loop() {
  if (!gameLoopRunning) return;
  update();
  draw();
  if (!gameOver) requestAnimationFrame(loop);
}

function startTimer() {
  clearInterval(timerInterval); 

  timerInterval = setInterval(() => {
    gameTime--;
    if (gameTime <= 0) {
      clearInterval(timerInterval);
      timeUp = true;
      gameOver = true;
    }
  }, 1000);
}


export function stopGame() {
  gameLoopRunning = false;
  gameOver = true;
  gameSong.pause();
  gameSong.currentTime = 0;
  clearInterval(speedInterval);
  clearInterval(timerInterval); // ✅ עצור גם את הטיימר
}

