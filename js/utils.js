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
