function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(div => {
      div.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
  }
  
  function loadLogo() {
    const canvas = document.getElementById('logo');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const logo = new Image();
    logo.src = 'assets/images/chickenVSkfc.png';
    logo.onload = () => ctx.drawImage(logo, 0, 0, 100, 100);
  }

  loadLogo();