
 function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}
window.addEventListener('DOMContentLoaded', () => {
  showScreen('homeScreen');


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


});
