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
  const clickSound = new Audio("assets/sounds/click.mp3");
  clickSound.volume = 0.5;

  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.id !== "newGameButton") {
        clickSound.currentTime = 0;
        if (!window.isMuted) clickSound.play();
      }
    });
  });
});

export function preloadAssets(onDone) {
  const images = [
    "assets/images/bg.webp",
    "assets/images/chicken.webp",
    "assets/images/heart.webp",
    "assets/images/kfc.webp",
    "assets/images/logo.webp"
  ];

  const sounds = [
    "assets/sounds/click.mp3",
    "assets/sounds/enemyShot.mp3",
    "assets/sounds/game-over-arcade-6435.mp3",
    "assets/sounds/gameSong.mp3",
    "assets/sounds/gameWon.mp3",
    "assets/sounds/heroShot.mp3",
    "assets/sounds/savedSettings.mp3",
    "assets/sounds/StartGame.mp3"
  ];

  let loaded = 0;
  const total = images.length + sounds.length;

  const progressBar = document.getElementById("progressBar");
  const loadingPercent = document.getElementById("loadingPercent");

  function checkDone() {
    loaded++;
    const percent = Math.round((loaded / total) * 100);
    if (progressBar) progressBar.style.width = percent + "%";
    if (loadingPercent) loadingPercent.textContent = percent + "%";

    if (loaded === total) {
      setTimeout(() => onDone(), 300); 
    }
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
