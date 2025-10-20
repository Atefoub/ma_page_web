document.addEventListener("DOMContentLoaded", function () {
  const bouton = document.getElementById("btn-exercices");
  const sectionExercices = document.getElementById("exercices");

  bouton.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le saut brutal
    sectionExercices.scrollIntoView({ behavior: "smooth" });
  });
});
