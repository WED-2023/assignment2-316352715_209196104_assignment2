const users=[    {username: 'p',password: 'testuser'}
];

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const toggleConfirm = document.getElementById("toggleConfirm");
const confirmInput = document.getElementById("confirm");

togglePassword.addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});
toggleConfirm?.addEventListener("change", function () {
  confirmInput.type = this.checked ? "text" : "password";
});


document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form from submitting until we validate

  const firstName = document.getElementById("firstname").value.trim();
  const lastName = document.getElementById("lastname").value.trim();
  const userName = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm").value;
  const error = document.getElementById("error");


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

  const newUser = {userName,password}
  users.push(newUser);
  document.getElementById("registerForm").reset();

  console.log("All users:", users);






});

