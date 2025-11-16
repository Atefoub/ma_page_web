document.addEventListener("DOMContentLoaded", function () {
  // Affichage de la date et de l'heure
  function updateDateTime() {
    const now = new Date();
    
    // Formater la date en français (ex: "Samedi 16 Nov. 2025")
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('fr-FR', dateOptions);
    
    // Formater l'heure (ex: "14:35:22")
    const timeStr = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Mettre à jour le DOM
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    
    if (dateElement && timeElement) {
      dateElement.textContent = dateStr;
      timeElement.textContent = timeStr;
    }
  }
  
  // Mettre à jour immédiatement
  updateDateTime();
  
  // Mettre à jour toutes les secondes
  setInterval(updateDateTime, 1000);

  // Fonctionnalité scroll smooth vers les exercices
  const bouton = document.getElementById("btn-exercices");
  const sectionExercices = document.getElementById("exercices");

  if (bouton && sectionExercices) {
    bouton.addEventListener("click", function (e) {
      e.preventDefault();
      sectionExercices.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Fonctionnalité bouton retour en haut
  const btnRetourHaut = document.getElementById("btn-retour-haut");

  if (btnRetourHaut) {
    // Afficher/masquer le bouton en fonction du scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btnRetourHaut.classList.add("visible");
      } else {
        btnRetourHaut.classList.remove("visible");
      }
    });

    // Retour en haut au clic
    btnRetourHaut.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Navigation horizontale des exercices
  const exercicesWrapper = document.querySelector(".exercices-wrapper");
  const navButtonLeft = document.querySelector(".nav-button-left");
  const navButtonRight = document.querySelector(".nav-button-right");

  if (exercicesWrapper && navButtonLeft && navButtonRight) {
    // Fonction pour mettre à jour l'état des boutons
    function updateNavButtons() {
      const scrollLeft = exercicesWrapper.scrollLeft;
      const maxScroll = exercicesWrapper.scrollWidth - exercicesWrapper.clientWidth;

      // Désactiver le bouton gauche si on est au début
      if (scrollLeft <= 0) {
        navButtonLeft.classList.add("disabled");
      } else {
        navButtonLeft.classList.remove("disabled");
      }

      // Désactiver le bouton droit si on est à la fin
      if (scrollLeft >= maxScroll - 5) {
        navButtonRight.classList.add("disabled");
      } else {
        navButtonRight.classList.remove("disabled");
      }
    }

    // Fonction de défilement
    function scrollExercices(direction) {
      const scrollAmount = 450; // Distance de défilement (largeur d'une carte + gap)
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

    // Événements de clic sur les boutons
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

    // Mettre à jour les boutons au scroll
    exercicesWrapper.addEventListener("scroll", updateNavButtons);

    // Mettre à jour les boutons au redimensionnement de la fenêtre
    window.addEventListener("resize", updateNavButtons);

    // Initialiser l'état des boutons
    updateNavButtons();

    // Support du scroll avec la molette de souris (optionnel mais pratique)
    exercicesWrapper.addEventListener("wheel", function (e) {
      // Si le scroll est vertical, le transformer en horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
});