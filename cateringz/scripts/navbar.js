document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.add("open");
  });

  closeMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
  });
});
