document.addEventListener("DOMContentLoaded", function () { 
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

  // ========== NAVIGATION PAR PAGE EXERCICES ==========
  const exercicesWrapper = document.querySelector(".exercices-wrapper");
  const navButtonLeft = document.querySelector(".nav-button-left");
  const navButtonRight = document.querySelector(".nav-button-right");
  const exercicePages = document.querySelectorAll(".exercices-page");

  if (exercicesWrapper && navButtonLeft && navButtonRight && exercicePages.length > 0) {
    
    // Déterminer la largeur d'une page (elle est égale à la largeur du wrapper visible)
    // Nous utilisons la largeur du premier élément .exercices-page pour plus de précision si le wrapper est plus grand
    let pageScrollWidth = exercicesWrapper.clientWidth;
    
    // Mettre à jour la largeur au redimensionnement
    window.addEventListener("resize", () => {
        pageScrollWidth = exercicesWrapper.clientWidth;
        updateNavButtons(); // Mettre à jour les boutons après redimensionnement
    });


    function updateNavButtons() {
      const scrollLeft = exercicesWrapper.scrollLeft;
      const maxScroll = exercicesWrapper.scrollWidth - exercicesWrapper.clientWidth;

      // Désactiver le bouton gauche si on est tout au début
      if (scrollLeft <= 5) { // Utiliser une petite marge pour la flottabilité
        navButtonLeft.classList.add("disabled");
      } else {
        navButtonLeft.classList.remove("disabled");
      }

      // Désactiver le bouton droit si on est tout à la fin
      // maxScroll - 5 pour la marge
      if (scrollLeft >= maxScroll - 5) {
        navButtonRight.classList.add("disabled");
      } else {
        navButtonRight.classList.remove("disabled");
      }
    }

    function scrollExercices(direction) {
      if (direction === "left") {
        exercicesWrapper.scrollBy({
          left: -pageScrollWidth,
          behavior: "smooth"
        });
      } else {
        exercicesWrapper.scrollBy({
          left: pageScrollWidth,
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
    updateNavButtons(); // Initial call to set button state

    // Désactivation du scroll à la molette pour éviter un scroll non désiré entre les pages
    exercicesWrapper.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
        // Laisser le scroll horizontal par défaut si c'est le scroll principal
        return;
      }
      e.preventDefault(); // Empêche le défilement vertical/horizontal libre
      
      // Optionnel : simuler le clic de bouton si le scroll vertical est dominant
      if (e.deltaY > 0) {
        if (!navButtonRight.classList.contains("disabled")) {
            scrollExercices("right");
        }
      } else {
        if (!navButtonLeft.classList.contains("disabled")) {
            scrollExercices("left");
        }
      }
      
    }, { passive: false });
  }
});