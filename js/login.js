import {showScreen} from "./game.js"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
      const error = document.getElementById("loginError");

      error.textContent = "";

      const found = users.find(user => user.username === username && user.password === password);

      console.log("Trying to login with:", username, password);
      console.log("Users from storage:", users);

      if (found) {
        sessionStorage.setItem("nextScreen", "configScreen");
        showScreen("configScreen")
      } else {

        console.log("Trying to login with:", username, password);
        console.log("Users in localStorage:", users);
        error.textContent = "Invalid username or password.";
      }
    });
  }
});
