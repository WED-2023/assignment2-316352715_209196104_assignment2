function showScreen(screenID){
  document.querySelectorAll('body > div').forEach(div =>{
    div.style.display= 'none';
  })
  document.getElementById(screenID).style.display = 'block';
}

document.getElementById("register").addEventListener("click", () => {
  showScreen("registerScreen");
});
document.getElementById("login").addEventListener("click", () => {
  showScreen("loginScreen");
});