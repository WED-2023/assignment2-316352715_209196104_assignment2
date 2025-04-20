import { renderConfigWizard, resetGameConfig } from './config.js';
import { initGame, stopGame } from './game.js';

const startSound = new Audio("assets/sounds/StartGame.wav");

export function updateUserBadge(delay = 0) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const username = sessionStorage.getItem("username") || "Guest";
  const badge = document.getElementById("userBadge");

  if (!badge) return;

  if (isLoggedIn) {
    const message = `🕹️ Welcome, Commander ${username}`;
    let i = 0;

    setTimeout(() => {
      function typeEffect() {
        if (i <= message.length) {
          badge.textContent = message.substring(0, i) + "_";
          i++;
          setTimeout(typeEffect, 60);
        } else {
          badge.textContent = message;
        }
      }

      badge.style.display = "block";
      typeEffect();
    }, delay);
  } else {
    badge.textContent = "";
    badge.style.display = "none";
  }
  setTimeout(() => {
    badge.style.display = "none";
  }, 6000); 
  
}



export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const scoresPanel = document.getElementById("highScoresBox");
  if (scoresPanel) {
    scoresPanel.classList.remove("visible");
    scoresPanel.classList.add("hidden");
  }

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    setTimeout(() => {
      targetScreen.classList.add('active');
    }, 50);
  }

  const topRightBtn = document.getElementById("viewHighScores");
  if (topRightBtn) {
    topRightBtn.classList.toggle("hidden", screenId !== "configScreen");
  }

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.style.display = (screenId === "homeScreen") ? "none" : "block";

    if (screenId === "loginScreen" || screenId === "registerScreen") {
      mainMenuBtn.textContent = "Menu";
    } else {
      mainMenuBtn.textContent = "Log Out";
    }
  }

  const newGameBtn = document.getElementById("newGameButton");
  if (newGameBtn) {
    const showForScreens = ["configScreen", "gameScreen"];
    newGameBtn.style.display = showForScreens.includes(screenId) ? "block" : "none";
  }
}



window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("isLoggedIn");
    resetGameConfig();
  });

  

  const defaultScreen = sessionStorage.getItem("nextScreen");
  if (defaultScreen === "configScreen") {
    renderConfigWizard();
  }
  showScreen(defaultScreen || "homeScreen");
  sessionStorage.removeItem("nextScreen");

  // new game button
  const startBtn = document.getElementById("newGameButton");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startSound.play();
      const existingPanel = document.getElementById("highScoresBox");
      if (existingPanel) {
        existingPanel.classList.remove("visible");
        existingPanel.classList.add("hidden");
      }

      const fireKey = sessionStorage.getItem("fireKey");
      const gameDuration = parseInt(sessionStorage.getItem("gameDuration"));

      if (!fireKey || isNaN(gameDuration)) {
        alert("Please configure the game before starting.");
        showScreen("configScreen");
        return;
      }

      stopGame();
      showScreen("gameScreen");

      setTimeout(() => {
        initGame({ fireKey, gameDuration });
      }, 100);
    });
  }

  // about modal
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

  // sign up button
  const regBtn = document.getElementById('registerBtn');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      showScreen('registerScreen');
    });
  }

  // login button
  const logBtn = document.getElementById('loginBtn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      showScreen('loginScreen');
    });
  }

  // main menu button
  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      stopGame();
      sessionStorage.removeItem("isLoggedIn");
      resetGameConfig();
      showScreen("homeScreen");
    });
  }

  // settings button
  const settingsBtn = document.getElementById("settingsButton");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      stopGame();
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        renderConfigWizard();
        showScreen("configScreen");
      } else {
        alert("You must be logged in to access settings.");
      }
    });
  }

//high scores button
  const showScoresBtn = document.getElementById("viewHighScores");
  if (showScoresBtn) {
    showScoresBtn.addEventListener("click", () => {
      const username = sessionStorage.getItem("username") || "Guest";
      const key = `scores_${username}`;
      const scores = JSON.parse(localStorage.getItem(key)) || [];

      if (scores.length > 0) {
        const rank = scores.indexOf(scores[0]) + 1;

        import("./game.js").then(module => {
          module.showScoresTable(scores, rank);

          setTimeout(() => {
            const panel = document.getElementById("highScoresBox");
            if (panel) {
              panel.classList.remove("visible");
            }
          }, 5000);
        });
      } else {
        alert("No scores yet!");
      }
    });
  }


});
