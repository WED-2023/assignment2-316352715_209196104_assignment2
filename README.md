# 🐔 Chicken Spaceship - Arcade Game

**Chicken Spaceship** is a retro-style arcade shooter game where you play as a brave space chicken battling waves of fried chicken invaders on a quest for galactic glory.

---

## 🎮 Features

- **Real-time shooting gameplay** on an HTML `<canvas>`
- **Custom fire key** configuration
- **User-defined game duration**
- **Player movement with arrow keys**
- **High score tracking** (per user, using localStorage)
- **Life system** (represented by hearts)
- **Sound effects** for:
  - Player shooting
  - Enemy shooting
  - Game start
  - Victory / Game over / Saved settings
- **Background music** that pauses/resumes with screen changes
- **Global mute toggle**
- **Volume control (via global variable)**

---

## 📁 Project Structure

```text
/
├── index.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── typography.css
│   └── components.css
├── assets/
│   ├── images/
│   │   ├── bg.webp
│   │   ├── chicken.webp
│   │   ├── kfc.webp
│   │   └── heart.webp
│   └── sounds/
│       ├── StartGame.mp3
│       ├── arcade-party-173553-compressed.mp3
│       ├── gameSong.mp3
│       ├── game-over-arcade-6435.mp3
│       ├── gameWon.mp3
│       ├── enemyShot.mp3
│       ├── heroShot.mp3
│       └── savedSettings.mp3
├── game.js
├── nav.js
├── config.js
├── login.js
├── registerform.js
└── utils.js
