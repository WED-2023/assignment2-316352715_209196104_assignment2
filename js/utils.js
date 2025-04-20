export function showMessage(id, msg, color = "lime") {
  const p = document.getElementById(id);
  p.textContent = msg;
  p.style.color = color;
  p.classList.remove("hidden");
  p.classList.add("visible");

  setTimeout(() => {
    p.classList.remove("visible");
    p.classList.add("hidden");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const clickSound = new Audio("assets/sounds/click.wav");
  clickSound.volume = 0.5;

  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.id !== "newGameButton") {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });
});

export function preloadAssets(onDone) {
  const images = [
    "assets/images/bg.png",
    "assets/images/chicken.png",
    "assets/images/heart.png",
    "assets/images/kfc.png",
    "assets/images/logo.png"
  ];

  const sounds = [
    "assets/sounds/click.wav",
    "assets/sounds/enemyShot.mp3",
    "assets/sounds/game-over-arcade-6435.mp3",
    "assets/sounds/gameSong.mp3",
    "assets/sounds/gameWon.mp3",
    "assets/sounds/heroShot.mp3",
    "assets/sounds/savedSettings.wav",
    "assets/sounds/StartGame.wav"
  ];

  let loaded = 0;
  const total = images.length + sounds.length;

  function checkDone() {
    loaded++;
    if (loaded === total) onDone();
  }

  images.forEach(src => {
    const img = new Image();
    img.onload = checkDone;
    img.onerror = checkDone;
    img.src = src;
  });

  sounds.forEach(src => {
    const audio = new Audio();
    audio.oncanplaythrough = checkDone;
    audio.onerror = checkDone;
    audio.src = src;
  });
}

