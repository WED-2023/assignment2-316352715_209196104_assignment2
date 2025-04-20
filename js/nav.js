import { renderConfigWizard, resetGameConfig } from './config.js';
import { initGame, stopGame } from './game.js';



window.globalVolume = 0.5; 

const startSound = new Audio("assets/sounds/StartGame.mp3");
const ambientMusic = new Audio("assets/sounds/arcade-party-173553-compressed.mp3");
ambientMusic.loop = true;
ambientMusic.volume = 0.05;
window.isMuted = false;
function ensureMinimumResolution() {
  const minWidth = 1366;
  const minHeight = 768;
  const userWidth = window.innerWidth;
  const userHeight = window.innerHeight;

  if (userWidth < minWidth || userHeight < minHeight) {
    document.body.innerHTML = `
      <div style="text-align: center; padding-top: 15vh; font-family: 'Orbitron', sans-serif;">
        <h2 style="color: red; font-size: 2rem;">
          ⚠️ Screen too small!
        </h2>
        <p style="font-size: 1.2rem; color: #333;">
          This game requires at least <strong>${minWidth}×${minHeight}</strong><br>
          Your current screen size: <strong>${userWidth}×${userHeight}</strong>
        </p>
        <p style="margin-top: 1.5rem; font-size: 1rem; color: #555;">
          Try one of the following:
        </p>
        <ul style="list-style: none; padding: 0; font-size: 1rem; color: #555;">
          <li>🔍 Maximize your browser window</li>
          <li>🖥️ Exit split-screen mode (if active)</li>
          <li>🧼 Close developer tools (DevTools)</li>
          <li>🔄 Refresh the page (F5) after resizing</li>
        </ul>
      </div>
    `;
  }
}


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
  ensureMinimumResolution();

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

  if (screenId === "gameScreen") {
    ambientMusic.pause();
    ambientMusic.currentTime = 0;
  } else {
    if (ambientMusic.paused && !isMuted) {
      ambientMusic.play().catch(err => console.warn("Autoplay blocked:", err));
    }
  }

  const topRightBtn = document.getElementById("viewHighScores");
  if (topRightBtn) {
    topRightBtn.classList.toggle("hidden", screenId !== "configScreen");
  }

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.style.display = (screenId === "homeScreen") ? "none" : "block";
    mainMenuBtn.textContent = (screenId === "loginScreen" || screenId === "registerScreen") ? "Menu" : "Log Out";
  }

  const newGameBtn = document.getElementById("newGameButton");
  if (newGameBtn) {
    const showForScreens = ["configScreen", "gameScreen"];
    newGameBtn.style.display = showForScreens.includes(screenId) ? "block" : "none";
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const muteBtn = document.getElementById("muteButton");
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      window.isMuted = !window.isMuted;
      muteBtn.textContent = window.isMuted ? "🔇" : "🔊";
    
      [ambientMusic, startSound].forEach(audio => {
        audio.muted = window.isMuted;
      });
    
      import('./game.js').then(module => {
        module.applyMuteSetting?.();  
      });
    });
    
    
  }

  const enableAudio = () => {
    if (ambientMusic.paused) {
      ambientMusic.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
    window.removeEventListener("click", enableAudio);
  };
  window.addEventListener("click", enableAudio);

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

  const dialog = document.getElementById("myAboutModal");
  const openBtn = document.getElementById("aboutButton");
  const closeBtn = document.getElementById("closeAboutModal");

  if (dialog && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => dialog.showModal());
    closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  const regBtn = document.getElementById('registerBtn');
  if (regBtn) regBtn.addEventListener('click', () => showScreen('registerScreen'));

  const logBtn = document.getElementById('loginBtn');
  if (logBtn) logBtn.addEventListener('click', () => showScreen('loginScreen'));

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      stopGame();
      sessionStorage.removeItem("isLoggedIn");
      resetGameConfig();
      showScreen("homeScreen");
    });
  }

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
            if (panel) panel.classList.remove("visible");
          }, 5000);
        });
      } else {
        alert("No scores yet!");
      }
    });
  }
});