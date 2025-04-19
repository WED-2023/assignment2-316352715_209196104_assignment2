import { initGame } from './game.js';
import { showScreen } from './nav.js';

let fireKey = sessionStorage.getItem("fireKey") || null;
let gameDuration = parseInt(sessionStorage.getItem("gameDuration")) || 2;

export function renderConfigWizard() {
  const wrapper = document.getElementById("configSettings");
  if (!wrapper) return;

  wrapper.replaceChildren();

  const container = document.getElementById("configFormTemplate").content.cloneNode(true);
  wrapper.appendChild(container);

  const fireKeyDisplay = wrapper.querySelector("#currentFireKey");
  const fireKeyBtn = wrapper.querySelector("#setFireKeyBtn");
  const durationInput = wrapper.querySelector("#gameDurationInput");
  const saveBtn = wrapper.querySelector("#saveSettingsBtn");
  const viewScoresBtn = wrapper.querySelector("#viewScoresBtn");
  if (viewScoresBtn) {
    viewScoresBtn.addEventListener("click", () => {
      const username = sessionStorage.getItem("username") || "Guest";
      const key = `scores_${username}`;
      const scores = JSON.parse(localStorage.getItem(key)) || [];
      if (scores.length > 0) {
        const rank = scores.indexOf(scores[0]) + 1;
        showScoresTable(scores, rank);
      } else {
        alert("No scores yet!");
      }
    });
  }
    const msg = wrapper.querySelector("#configSavedMessage");

    fireKeyDisplay.textContent = fireKey ? getReadableKeyName(fireKey, fireKey.replace("Key", "")) : "Not set";
    durationInput.value = gameDuration;

  fireKeyBtn.addEventListener("click", () => {
    fireKeyDisplay.textContent = "Waiting for key press...";
    document.activeElement.blur(); 
    setTimeout(() => {
      window.addEventListener("keydown", function handler(e) {
        fireKey = e.code;
        const displayName = getReadableKeyName(e.code, e.key);
        fireKeyDisplay.textContent = displayName;
        sessionStorage.setItem("fireKey", fireKey);
        window.removeEventListener("keydown", handler);
      });
    }, 50);
  });

  function getReadableKeyName(code, key) {
    if (code === "Space") return "Spacebar";
    return key.toUpperCase(); // מראה רק את האות עצמה
  }
  

  saveBtn.addEventListener("click", () => {
    const val = parseInt(durationInput.value);
    if (val >= 2) {
      gameDuration = val;
      sessionStorage.setItem("gameDuration", gameDuration);
      showSaved();
    } else {
      alert("Game time must be at least 2 minutes.");
    }
  });



  function showSaved() {
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
  }

  
}

export function resetGameConfig() {
  sessionStorage.removeItem("fireKey");
  sessionStorage.removeItem("gameDuration");
  return { fireKey: null, gameDuration: null };
}


