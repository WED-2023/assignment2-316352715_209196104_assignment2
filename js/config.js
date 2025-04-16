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
  // const startBtn = wrapper.querySelector("#startGameBtn");
  const msg = wrapper.querySelector("#configSavedMessage");

  fireKeyDisplay.textContent = fireKey || "Not set";
  durationInput.value = gameDuration;

  fireKeyBtn.addEventListener("click", () => {
    fireKeyDisplay.textContent = "Waiting for key press...";
    document.activeElement.blur(); 
    setTimeout(() => {
      window.addEventListener("keydown", function handler(e) {
        fireKey = e.code;
        const displayName = getReadableKeyName(e.code);
        fireKeyDisplay.textContent = displayName;
        sessionStorage.setItem("fireKey", fireKey);
        window.removeEventListener("keydown", handler);
        showSaved();
      });
    }, 50);
  });

  function getReadableKeyName(code) {
    if (code === "Space") return "Spacebar";
    if (code.startsWith("Key")) return code.replace("Key", "");
    if (code.startsWith("Digit")) return code.replace("Digit", "");
    return code;
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

  // startBtn.addEventListener("click", () => {
  //   if (!fireKey || !gameDuration) {
  //     alert("Please complete all settings before starting.");
  //     return;
  //   }
  //   showScreen("gameScreen");
  //   initGame({ fireKey, gameDuration });
  // });

  function showSaved() {
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
  }
}