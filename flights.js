(function () {
  "use strict";

  /* ---------- Theme toggle (persist in localStorage) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("skynest-theme");
  if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

  themeToggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("skynest-theme", next);
  });
  /* ---------- Navbar shadow on scroll ---------- */
  const navbar = document.querySelector(".navbar-sky");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });