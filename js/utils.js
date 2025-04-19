export function showMessage(id, msg, color = "lime") {
    const p = document.getElementById(id);
    p.textContent = msg;
    p.style.color = color;
    p.classList.remove("hidden");
    p.classList.add("visible");
  
    setTimeout(() => {
      p.classList.remove("visible");
      p.classList.add("hidden");
    }, 3000);
  }
  
  