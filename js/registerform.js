import {showScreen} from "./nav.js"
import { showMessage } from "./utils.js";


let users = JSON.parse(localStorage.getItem("users"));
if (!users) {
  users = [{ username: "p", password: "testuser" }];
  localStorage.setItem("users", JSON.stringify(users));
}


const togglePassword = document.getElementById("registerTogglePassword");
const passwordInput = document.getElementById("registerPassword");
const toggleConfirm = document.getElementById("registerToggleConfirm");
const confirmInput = document.getElementById("registerConfirm");

togglePassword.addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});
toggleConfirm?.addEventListener("change", function () {
  confirmInput.type = this.checked ? "text" : "password";
});


document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form from submitting until we validate

  const firstName = document.getElementById("registerFirstname").value.trim();
  const lastName = document.getElementById("registerLastname").value.trim();
  const userName = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirm").value;
  const error = document.getElementById("registerError");


  // Clear previous errors
  error.textContent = "";
// 1. Check if all fields are filled
if (!firstName || !lastName || !userName || !email || !password || !confirmPassword) {
  showMessage("registerMessage", "Please fill out all fields.", "red");
  return;
}

// 2. Name and Last Name should be letters only
if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
  showMessage("registerMessage", "First and last name must contain letters only.", "red");
  return;
}

// 3. Check if email is valid
if (!/^\S+@\S+\.\S+$/.test(email)) {
  showMessage("registerMessage", "Please enter a valid email address.", "red");
  return;
}

// 4. Password must be at least 8 characters, with numbers and letters
if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
  showMessage("registerMessage", "Password must be at least 8 characters and contain both letters and numbers.", "red");
  return;
}  

// 5. Passwords match
if (password !== confirmPassword) {
  showMessage("registerMessage", "Passwords do not match.", "red");
  return;
}


  // ✅ If all good:

  showMessage("registerMessage", "Registration succeeded!", "lime");

  setTimeout(() => {
    const newUser = { username: userName, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("nextScreen", "configScreen");
    showScreen("configScreen");
  }, 1500);
  
  // You can submit the form here (or send it with fetch)
  // e.target.submit();
  const newUser = {username:userName,password}
  users.push(newUser);
  localStorage.setItem("users",JSON.stringify(users));
  
  sessionStorage.setItem("nextScreen", "configScreen");
  showScreen("configScreen");

});

