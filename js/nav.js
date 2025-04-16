import { renderConfigWizard } from './config.js';


export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    setTimeout(() => {
      targetScreen.classList.add('active');
    }, 50); // עיכוב קל למניעת קפיצה מיידית
  }

  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.style.display = (screenId === "homeScreen") ? "none" : "block";
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const defaultScreen = sessionStorage.getItem("nextScreen");
  if (defaultScreen === "configScreen") {
    renderConfigWizard(); // כדי שתוכן ההגדרות יופיע
  }
  showScreen(defaultScreen || "homeScreen");
  sessionStorage.removeItem("nextScreen");

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
      showScreen("homeScreen");
    });
  }
  

  const settingsBtn = document.getElementById("settingsButton");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        renderConfigWizard(); // ← מרנדר את ההגדרות
        showScreen("configScreen");
      } else {
        alert("You must be logged in to access settings.");
      }
    });
  }
  

});


