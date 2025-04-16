export function showScreen(screenId) {
  // הסתרת כל המסכים
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // הצגת המסך הרצוי
  document.getElementById(screenId).classList.add('active');

  // הצגת/הסתרת כפתור Main Menu בהתאם למסך
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
  // בדיקה אם יש מסך שמור במעבר ממסך קודם
  const defaultScreen = sessionStorage.getItem("nextScreen");
  if (defaultScreen) {
    showScreen(defaultScreen);
    sessionStorage.removeItem("nextScreen");
  } else {
    showScreen("homeScreen");
  }

  // מעבר לטופס הרשמה
  const regBtn = document.getElementById('registerBtn');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      showScreen('registerScreen');
    });
  }

  // מעבר לטופס התחברות
  const logBtn = document.getElementById('loginBtn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      showScreen('loginScreen');
    });
  }

  // לחיצה על כפתור Main Menu הצף
  const mainMenuBtn = document.getElementById("mainMenuButton");
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      showScreen("homeScreen");
    });
  }
});
