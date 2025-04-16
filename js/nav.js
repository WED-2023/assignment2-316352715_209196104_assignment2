import { renderConfigWizard, resetGameConfig } from './config.js';
import { initGame } from './game.js'; 

export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    setTimeout(() => {
      targetScreen.classList.add('active');
    }, 50);
  }

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.style.display = (screenId === "homeScreen") ? "none" : "block";
  }

  const newGameBtn = document.getElementById("newGameButton");
  if (newGameBtn) {
    const showForScreens = ["configScreen", "gameScreen"];
    newGameBtn.style.display = showForScreens.includes(screenId) ? "block" : "none";
  }
}


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("beforeunload", () => {
    resetGameConfig();
  });  
  const defaultScreen = sessionStorage.getItem("nextScreen");
  if (defaultScreen === "configScreen") {
    renderConfigWizard();
  }
  showScreen(defaultScreen || "homeScreen");
  sessionStorage.removeItem("nextScreen");

  const startBtn = document.getElementById("newGameButton");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const fireKey = sessionStorage.getItem("fireKey");
      const gameDuration = parseInt(sessionStorage.getItem("gameDuration"));

      if (!fireKey || isNaN(gameDuration)) {
        alert("Please configure the game before starting.");
        showScreen("configScreen");
        return;
      }

      showScreen("gameScreen");
      initGame({ fireKey, gameDuration });
    });
  }

  const dialog = document.getElementById("myAboutModal");
  const openBtn = document.getElementById("aboutButton");
  const closeBtn = document.getElementById("closeAboutModal");

  if (dialog && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!clickedInside) {
        dialog.close();
      }
    });
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
      sessionStorage.removeItem("isLoggedIn");
      resetGameConfig();
      showScreen("homeScreen");
    });
  }

  const settingsBtn = document.getElementById("settingsButton");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        renderConfigWizard();
        showScreen("configScreen");
      } else {
        alert("You must be logged in to access settings.");
      }
    });
  }
});
