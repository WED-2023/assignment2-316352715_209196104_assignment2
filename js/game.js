
// // ========================
// // Chicken Game with Shooting and Enemy Fire
// // ========================

// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// export let currentFireKey = null;
// let remainingTime = 30;
// let gameOver = false;
// let score = 0;
// let gameTime = 30; // seconds
// let heroLives = 3; // chicken has initial 3 lives until game over
// let gameWon = false;
// let scoreSaved = false; //monitor if we saved the score


// // Load images
// const bgImage = new Image();
// bgImage.src = "assets/images/bg.png";

// const heroImage = new Image();
// heroImage.src = "assets/images/chicken.png";

// const monsterImage = new Image();
// monsterImage.src = "assets/images/kfc.png";

// const heartImage = new Image();
// heartImage.src = "assets/images/heart.png";

// //Load sounds
// const gameSong = new Audio("assets/sounds/gameSong.mp3");
// gameSong.loop = true; 

// const gameOverSong = new Audio("assets/sounds/game-over-arcade-6435.mp3");
// const gameWinSong = new Audio("assets/sounds/gameWon.mp3");
// const enemyShootMp3 = new Audio("assets/sounds/enemyShot.mp3");
// const heroShootMp3 = new Audio("assets/sounds/heroShot.mp3");



// // Hero object (the chicken)
// const hero = {
//   x: 100,
//   y: canvas.height * 0.7,
//   width: 32,
//   height: 32,
//   speed: 5
// };

// // Bullets
// let bullets = [];
// const BULLET_SPEED = 8;
// const BULLET_RADIUS = 5;

// // Enemy bullets
// let enemyBullets = [];
// let ENEMY_BULLET_SPEED = 3;
// const ENEMY_BULLET_RADIUS = 5;
// let lastEnemyShooterIndex = null;

// // Monsters
// const monsters = [];
// const rows = 4;
// const cols = 5;
// const monsterSpacing = 10;
// const monsterWidth = 32;
// const monsterHeight = 32;
// let monsterDirection = 1;
// let monsterSpeed = 1;

// // Initialize monsters in a 5x4 grid at the top
// for (let row = 0; row < rows; row++) {
//   for (let col = 0; col < cols; col++) {
//     monsters.push({
//       x: col * (monsterWidth + monsterSpacing),
//       y: row * (monsterHeight + monsterSpacing),
//       width: monsterWidth,
//       height: monsterHeight
//     });
//   }
// }

// export function initGame(settings) {
//   gameSong.currentTime = 0; 
//   gameSong.play();
//   const { fireKey, gameDuration } = settings;
//   console.log("Game starting with:", fireKey, gameDuration);
//   currentFireKey = fireKey;
//   remainingTime = gameDuration * 60;
//   gameTime = gameDuration * 60;
//   gameOver = false;
//   bullets = [];
//   enemyBullets = [];
//   score = 0;
//   heroLives = 3;
//   scoreSaved = false;
//   startTimer();
//   loop();
// }

// // Key tracking
// const keys = {};
// document.addEventListener("keydown", e => {
//   if (e.code === currentFireKey) {
//     e.preventDefault(); 
//     shoot();
//   }
//   keys[e.key] = true;
// });
// document.addEventListener("keyup", e => delete keys[e.key]);

// function shoot() {
//   if (gameOver) return;
//   heroShootMp3.play()
//   bullets.push({
//     x: hero.x + hero.width / 2,
//     y: hero.y,
//     radius: BULLET_RADIUS,
//     speed: BULLET_SPEED
//   });
// }

// let increaseTimes = 4;
// function increaseEnemiesSpeed() {
//   monsterSpeed += 5;
//   ENEMY_BULLET_SPEED += 5;
//   increaseTimes--;
// }
// if (increaseTimes > 0) {
//   setInterval(increaseEnemiesSpeed, 5000);
// }

// function enemyShoot() {
//   if (gameOver || monsters.length === 0) return;
  
//   if (enemyBullets.length > 0) {
//     const bullet = enemyBullets[enemyBullets.length - 1];
//     if (bullet.y < canvas.height * 0.75) return;
//   }

//   const randomIndex = Math.floor(Math.random() * monsters.length);
//   const shooter = monsters[randomIndex];
//   lastEnemyShooterIndex = randomIndex;

//   enemyBullets.push({
//     x: shooter.x + shooter.width / 2,
//     y: shooter.y + shooter.height,
//     radius: ENEMY_BULLET_RADIUS,
//     speed: ENEMY_BULLET_SPEED
//   });
//   enemyShootMp3.play()
// }

// function update() {
//   if (gameOver) return;

//   const bottomLimit = canvas.height;
//   const topLimit = canvas.height * 0.6;

//   if (keys["ArrowUp"] && hero.y > topLimit) hero.y -= hero.speed;
//   if (keys["ArrowDown"] && hero.y < bottomLimit - hero.height) hero.y += hero.speed;
//   if (keys["ArrowLeft"] && hero.x > 0) hero.x -= hero.speed;
//   if (keys["ArrowRight"] && hero.x < canvas.width - hero.width) hero.x += hero.speed;

//   let hitEdge = false;
//   monsters.forEach(monster => {
//     monster.x += monsterDirection * monsterSpeed;
//     if (monster.x <= 0 || monster.x + monster.width >= canvas.width) {
//       hitEdge = true;
//     }
//   });
//   if (hitEdge) monsterDirection *= -1;

//   bullets.forEach((bullet, bIndex) => {
//     bullet.y -= bullet.speed;
//     if (bullet.y + bullet.radius < 0) {
//       bullets.splice(bIndex, 1);
//       return;
//     }

//     monsters.forEach((monster, mIndex) => {
//       const dx = bullet.x - (monster.x + monster.width / 2);
//       const dy = bullet.y - (monster.y + monster.height / 2);
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < monster.width / 2 + bullet.radius) {
//         if (mIndex <= 4) score += 20;
//         else if (mIndex <= 9) score += 15;
//         else if (mIndex <= 14) score += 10;
//         else if (mIndex <= 19) score += 5;
//         monsters.splice(mIndex, 1);
//         bullets.splice(bIndex, 1);
//         if (monsters.length === 0) {
//           gameOver = true;
//           gameWon = true;
//           return
//         }
//       }
//     });
//   });

//   enemyBullets.forEach((bullet, index) => {
//     bullet.y += bullet.speed;

//     if (bullet.y > canvas.height) {
//       enemyBullets.splice(index, 1);
//       return;
//     }

//     const dx = bullet.x - (hero.x + hero.width / 2);
//     const dy = bullet.y - (hero.y + hero.height / 2);
//     const distance = Math.sqrt(dx * dx + dy * dy);

//     if (distance < hero.width / 2 + bullet.radius) {
//       enemyBullets.splice(index, 1);
//       heroLives--;
//       if (heroLives === 0) {
//         gameOver = true;
//       }
//     }
//   });

//   enemyShoot();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   if (bgImage.complete) ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

//   monsters.forEach(monster => {
//     if (monsterImage.complete) {
//       ctx.drawImage(monsterImage, monster.x, monster.y, monster.width, monster.height);
//     }
//   });

//   if (heroImage.complete) {
//     ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
//   }

//   ctx.fillStyle = "red";
//   bullets.forEach(bullet => {
//     ctx.beginPath();
//     ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//     ctx.fill();
//   });

//   ctx.fillStyle = "yellow";
//   enemyBullets.forEach(bullet => {
//     ctx.beginPath();
//     ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
//     ctx.fill();
//   });

//   ctx.fillStyle = "white";
//   ctx.font = "20px Arial";
//   ctx.fillText("Score: " + score + " | Time left: " + Math.ceil(gameTime / 60), 20, 30);

//   for (let i = 0; i < heroLives; i++) {
//     if (heartImage.complete) {
//       ctx.drawImage(heartImage, 20 + i * 40, 60, 30, 30);
//     }
//   }

//   if (gameOver) {
//     gameSong.pause();
//     if (!scoreSaved) {
//       scoreSaved = true;
//       const { scores, rank } = saveScore();
//       setTimeout(() => {
//         showScoresTable(scores, rank);
//       }, 3000);
//     }

//     if (gameWon) {
//       gameWinSong.play();
//       ctx.fillStyle = "white";
//       ctx.font = "40px Arial";
//       ctx.fillText("Congrats you won!!!", canvas.width / 2 - 120, canvas.height / 2);
//     } else {
//       gameOverSong.play();
//       ctx.fillStyle = "white";
//       ctx.font = "40px Arial";
//       ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
//     }
//   }
// }

// function saveScore() { 
//   const username = sessionStorage.getItem("username") || "Guest";
//   const key = `scores_${username}`;

//   let scores = JSON.parse(localStorage.getItem(key)) || [];

//   scores.push(score);

//   scores.sort((a, b) => b - a);

//   localStorage.setItem(key, JSON.stringify(scores));
//   return { scores, rank: scores.indexOf(score) + 1 };
// }

// function showScoresTable(scores, rank) {
//   let panel = document.getElementById("highScoresBox");
//   if (!panel) {
//     panel = document.createElement("div");
//     panel.id = "highScoresBox";
//     panel.style.position = "absolute";
//     panel.style.top = "20px";
//     panel.style.right = "20px";
//     panel.style.padding = "10px";
//     panel.style.backgroundColor = "rgba(0,0,0,0.7)";
//     panel.style.color = "white";
//     panel.style.border = "2px solid white";
//     panel.style.fontFamily = "Arial";
//     panel.style.zIndex = "9999";
//     document.body.appendChild(panel);
//   }

//   panel.innerHTML = `<h3>Your Scores</h3><ol>${scores.map((s, i) => `<li>${s}${i + 1 === rank ? " ← You" : ""}</li>`).join('')}</ol><p>Your rank: #${rank}</p>`;
// }

// function loop() {
//   update();
//   draw();
//   if (!gameOver) {
//     requestAnimationFrame(loop);
//   }
// }

// function startTimer() {
//   const timer = setInterval(() => {
//     gameTime--;
//     if (gameTime <= 0) {
//       clearInterval(timer);
//       gameOver = true;
//     }
//   }, 1000);
// }
// export function stopGame() {
//   gameOver = true; 
//   gameSong.pause(); 
//   gameSong.currentTime = 0; 
// }

// ========================
// Chicken Game with Shooting and Enemy Fire
// ========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

export let currentFireKey = null;
let remainingTime = 30;
let gameOver = false;
let score = 0;
let gameTime = 30; // seconds
let heroLives = 3; // chicken has initial 3 lives until game over
let gameWon = false;
let scoreSaved = false; //monitor if we saved the score

let monsterSpeed = 1;
let ENEMY_BULLET_SPEED = 3;
let increaseTimes = 4;
let speedInterval = null;

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
  scoreSaved = false;
  initMonsters();
  clearInterval(speedInterval);
  if (increaseTimes > 0) {
    speedInterval = setInterval(() => {
      if (increaseTimes > 0) {
        monsterSpeed += 5;
        ENEMY_BULLET_SPEED += 5;
        increaseTimes--;
      }
    }, 5000);
  }
  startTimer();
  loop();
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
          gameWon = true;
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
  ctx.fillText("Score: " + score + " | Time left: " + Math.ceil(gameTime / 60), 20, 30);
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
      setTimeout(() => {
        showScoresTable(scores, rank);
      }, 3000);
    }
    if (gameWon) {
      gameWinSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("Congrats you won!!!", canvas.width / 2 - 120, canvas.height / 2);
    } else {
      gameOverSong.play();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
    }
  }
}

function saveScore() { 
  const username = sessionStorage.getItem("username") || "Guest";
  const key = `scores_${username}`;
  let scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  localStorage.setItem(key, JSON.stringify(scores));
  return { scores, rank: scores.indexOf(score) + 1 };
}

function showScoresTable(scores, rank) {
  let panel = document.getElementById("highScoresBox");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "highScoresBox";
    panel.style.position = "absolute";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.padding = "10px";
    panel.style.backgroundColor = "rgba(0,0,0,0.7)";
    panel.style.color = "white";
    panel.style.border = "2px solid white";
    panel.style.fontFamily = "Arial";
    panel.style.zIndex = "9999";
    document.body.appendChild(panel);
  }
  panel.innerHTML = `<h3>Your Scores</h3><ol>${scores.map((s, i) => `<li>${s}${i + 1 === rank ? " ← You" : ""}</li>`).join('')}</ol><p>Your rank: #${rank}</p>`;
}

function loop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(loop);
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

export function stopGame() {
  gameOver = true;
  gameSong.pause();
  gameSong.currentTime = 0;
  clearInterval(speedInterval);
}
