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
```

---

## 🕹️ How to Play

1. **Login or Register** (optional, but recommended for saving scores)
2. Click **Settings**
3. Choose a **fire key** (e.g., `Space`)
4. Set the **game duration** (minimum: 2 minutes)
5. Click **New Game** to start
6. Use **arrow keys** to move
7. Use your fire key to **shoot enemies**
8. Earn as many points as possible before time runs out or you lose all lives

---

## ⚙️ Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API
- SessionStorage & LocalStorage

---

## 🔇 Audio Notes

- Sounds and music will only play **after the first user click** (due to browser autoplay restrictions)
- Use the **mute button** to toggle sound
- Sound volume is controlled globally via a `window.globalVolume` variable

---

## ✨ Credits

- 👨‍💻 Code: Rom Sheynis & Lioz Shor
- 🎨 Graphics: AI + custom icons  
- 🔊 Sounds: Pixabay & Mixkit  
- ✍️ Fonts: [Orbitron](https://fonts.google.com/specimen/Orbitron) from Google Fonts

---

## 🚀 Future Ideas

- 📱 Mobile support
- 👾 Boss fights
- 🛡️ Power-ups
- ☁️ Cloud-based score saving
- 🎨 User-selectable themes

---

