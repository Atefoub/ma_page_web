document.addEventListener("DOMContentLoaded", function () {
  // ========== MATRIX RAIN EFFECT ==========
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const btnMatrixToggle = document.getElementById('btn-matrix-toggle');
  
  let matrixActive = false;
  let animationId = null;
  
  // Redimensionner le canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Caractères Matrix (chiffres + symboles)
  const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';
  const chars = matrixChars.split('');
  
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  const drops = [];
  
  // Initialiser les gouttes
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
  }
  
  // Fonction d'animation Matrix
  function drawMatrix() {
    // Fond semi-transparent pour l'effet de trainée
    ctx.fillStyle = 'rgba(255, 244, 230, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Utiliser les couleurs du portfolio (dégradé rouge/orange)
    const colors = ['#d1495b', '#ff9f1c', '#b33f3f'];
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Alterner les couleurs de manière aléatoire
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillText(char, x, y);
      
      // Réinitialiser la goutte aléatoirement
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
    
    if (matrixActive) {
      animationId = requestAnimationFrame(drawMatrix);
    }
  }
  
  // Toggle Matrix Rain
  btnMatrixToggle.addEventListener('click', function() {
    matrixActive = !matrixActive;
    
    if (matrixActive) {
      canvas.classList.add('active');
      btnMatrixToggle.classList.add('active');
      btnMatrixToggle.title = 'Désactiver Matrix Rain';
      
      // Réinitialiser les colonnes si nécessaire
      columns = Math.floor(canvas.width / fontSize);
      drops.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
      }
      
      drawMatrix();
    } else {
      canvas.classList.remove('active');
      btnMatrixToggle.classList.remove('active');
      btnMatrixToggle.title = 'Activer Matrix Rain';
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  // ========== DATE ET HEURE ==========
  function updateDateTime() {
    const now = new Date();
    
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('fr-FR', dateOptions);
    
    const timeStr = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    
    if (dateElement && timeElement) {
      dateElement.textContent = dateStr;
      timeElement.textContent = timeStr;
    }
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ========== SCROLL SMOOTH VERS EXERCICES ==========
  const bouton = document.getElementById("btn-exercices");
  const sectionExercices = document.getElementById("exercices");

  if (bouton && sectionExercices) {
    bouton.addEventListener("click", function (e) {
      e.preventDefault();
      sectionExercices.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ========== BOUTON RETOUR EN HAUT ==========
  const btnRetourHaut = document.getElementById("btn-retour-haut");

  if (btnRetourHaut) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btnRetourHaut.classList.add("visible");
      } else {
        btnRetourHaut.classList.remove("visible");
      }
    });

    btnRetourHaut.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ========== NAVIGATION HORIZONTALE EXERCICES ==========
  const exercicesWrapper = document.querySelector(".exercices-wrapper");
  const navButtonLeft = document.querySelector(".nav-button-left");
  const navButtonRight = document.querySelector(".nav-button-right");

  if (exercicesWrapper && navButtonLeft && navButtonRight) {
    function updateNavButtons() {
      const scrollLeft = exercicesWrapper.scrollLeft;
      const maxScroll = exercicesWrapper.scrollWidth - exercicesWrapper.clientWidth;

      if (scrollLeft <= 0) {
        navButtonLeft.classList.add("disabled");
      } else {
        navButtonLeft.classList.remove("disabled");
      }

      if (scrollLeft >= maxScroll - 5) {
        navButtonRight.classList.add("disabled");
      } else {
        navButtonRight.classList.remove("disabled");
      }
    }

    function scrollExercices(direction) {
      const scrollAmount = 450;
      const currentScroll = exercicesWrapper.scrollLeft;
      
      if (direction === "left") {
        exercicesWrapper.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth"
        });
      } else {
        exercicesWrapper.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth"
        });
      }
    }

    navButtonLeft.addEventListener("click", function () {
      if (!this.classList.contains("disabled")) {
        scrollExercices("left");
      }
    });

    navButtonRight.addEventListener("click", function () {
      if (!this.classList.contains("disabled")) {
        scrollExercices("right");
      }
    });

    exercicesWrapper.addEventListener("scroll", updateNavButtons);
    window.addEventListener("resize", updateNavButtons);
    updateNavButtons();

    exercicesWrapper.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
});