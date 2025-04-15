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
    error.textContent = "Please fill out all fields.";
    return;
  }

  // 2. Name and Last Name should be letters only
  if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    error.textContent = "First and last name must contain letters only.";
    return;
  }

  // 3. Check if email is valid
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    error.textContent = "Please enter a valid email address.";
    return;
  }

  // 4. Password must be at least 8 characters, with numbers and letters
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    error.textContent = "Password must be at least 8 characters and contain both letters and numbers.";
    return;
  }  

  // 5. Passwords match
  if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    return;
  }

  // ✅ If all good:
  alert("Registration successful!");
  // You can submit the form here (or send it with fetch)
  // e.target.submit();

  console.log("Form submitted!");

  const newUser = {username:userName,password}
  users.push(newUser);
  localStorage.setItem("users",JSON.stringify(users));
  
  document.getElementById("registerForm").reset();

  console.log("All users:", users);






});

