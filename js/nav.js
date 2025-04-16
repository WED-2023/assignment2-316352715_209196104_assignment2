export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(screenId).classList.add('active');

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    if (screenId === "homeScreen") {
      mainMenuBtn.style.display = "none";
    } else {
      mainMenuBtn.style.display = "block";
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const defaultScreen = sessionStorage.getItem("nextScreen");
  if (defaultScreen) {
    showScreen(defaultScreen);
    sessionStorage.removeItem("nextScreen");
  } else {
    showScreen("homeScreen");
  }

  const regBtn = document.getElementById('registerBtn');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      showScreen('registerScreen');
    });
  }

  const logBtn = document.getElementById('loginBtn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      showScreen('loginScreen');
    });
  }

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      showScreen("homeScreen");
    });
  }
});