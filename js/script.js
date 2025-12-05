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