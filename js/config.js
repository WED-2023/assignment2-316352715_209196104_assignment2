let fireKey = null;
let gameDuration = null;
document.addEventListener('DOMContentLoaded', () => {
  showFireKeyStep();
});

function showFireKeyStep() {
  const container = document.getElementById('fireKeyDisplay');
  container.innerHTML = `
    <h1>Configuration Screen</h1>
    <h2>Configure Fire Key</h2>
    <p id="selectedKey">Press a key to assign it as your "FIRE" action:</p>
    <button id="setFireKeyBtn">Set Fire Key</button>
  `;

  const setKeyBtn = document.getElementById('setFireKeyBtn');
  const selectedKeyText = document.getElementById('selectedKey');

  setKeyBtn.addEventListener('click', () => {
    selectedKeyText.textContent = "Waiting for key press...";
    window.addEventListener('keydown', function handler(e) {
      fireKey = e.code;
      selectedKeyText.textContent = `Selected fire key: ${fireKey}`;
      window.removeEventListener('keydown', handler);
      setTimeout(showTimeSelectionStep, 1000); // עוברים שלב
    });
  });
}

function showTimeSelectionStep() {
  const container = document.getElementById('fireKeyDisplay');
  container.innerHTML = `
    <h2>Select Game Duration</h2>
    <label for="gameTime">Enter game time (in minutes):</label>
    <input type="number" id="gameTime" min="2" value="2" />
    <button id="confirmTimeBtn">Confirm</button>
    <p id="timeError" style="color: red;"></p>
  `;

  const confirmBtn = document.getElementById('confirmTimeBtn');
  const input = document.getElementById('gameTime');
  const error = document.getElementById('timeError');

  confirmBtn.addEventListener('click', () => {
    const val = parseInt(input.value);
    if (val >= 2) {
      gameDuration = val;
      showStartGameStep();
    } else {
      error.textContent = "Game time must be at least 2 minutes.";
    }
  });
}

function showStartGameStep() {
  const container = document.getElementById('fireKeyDisplay');
  container.innerHTML = `
    <h2>You're Ready!</h2>
    <p>Fire key: ${fireKey}</p>
    <p>Game duration: ${gameDuration} minutes</p>
    <button id="startGameBtn">Start Game</button>
  `;

  const startBtn = document.getElementById('startGameBtn');
  startBtn.addEventListener('click', () => {
    // פה תעבור למשחק עם ההגדרות
    showScreen('gameScreen');
    initGame({ fireKey, gameDuration });
  });
}
