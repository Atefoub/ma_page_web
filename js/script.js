document.addEventListener("DOMContentLoaded", function () {
  // Fonctionnalité scroll smooth vers les exercices
  const bouton = document.getElementById("btn-exercices");
  const sectionExercices = document.getElementById("exercices");

  bouton.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le saut brutal
    sectionExercices.scrollIntoView({ behavior: "smooth" });
  });

  // Fonctionnalité bouton retour en haut
  const btnRetourHaut = document.getElementById("btn-retour-haut");

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
});