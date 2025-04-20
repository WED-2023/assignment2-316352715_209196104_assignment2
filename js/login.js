import { showMessage } from "./utils.js";
import { renderConfigWizard } from "./config.js";
import { showScreen, updateUserBadge } from "./nav.js";





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const toggle = document.getElementById("loginTogglePassword");
  const passwordInput = document.getElementById("loginPassword");

  if (toggle && passwordInput) {
    toggle.addEventListener("change", () => {
      passwordInput.type = toggle.checked ? "text" : "password";
    });
  }

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
    
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const usernameInput = document.getElementById("loginUsername");
      const passwordInput = document.getElementById("loginPassword");
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const error = document.getElementById("loginError");
      error.textContent = "";
    
      const found = users.find(user => user.username === username && user.password === password);
    
      if (found) {
        const previousUser = sessionStorage.getItem("username");
    
        if (previousUser && previousUser !== username) {
          localStorage.removeItem(`scores_${previousUser}`);
        }
    
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("isLoggedIn", "true");
    
        renderConfigWizard();  
        showMessage("loginMessage", "Login successful!");
    
        setTimeout(() => {
          sessionStorage.setItem("nextScreen", "configScreen");
          showScreen("configScreen");
          updateUserBadge(0); 
        }, 1500);
        
      } else {
        showMessage("loginMessage", "Login failed!", "red");
      }
    });
    
  }
});
