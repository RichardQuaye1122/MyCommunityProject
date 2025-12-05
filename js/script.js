// js/script.js
// Shared script for ALL pages

document.addEventListener("DOMContentLoaded", () => {
  // ————— DARK MODE TOGGLE —————
  const toggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Load saved theme or respect system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    if (toggle) toggle.checked = savedTheme === "dark";
  } else if (prefersDark) {
    html.setAttribute("data-theme", "dark");
    if (toggle) toggle.checked = true;
  }

  // Save theme on change
  if (toggle) {
    toggle.addEventListener("change", () => {
      const newTheme = toggle.checked ? "dark" : "light";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // ————— AOS ANIMATIONS (only on pages that use it) —————
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }

  // ————— SMOOTH SCROLLING FOR ANCHOR LINKS —————
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ————— MOBILE MENU CLOSE ON LINK CLICK —————
  const mobileMenuLinks = document.querySelectorAll('.dropdown-content a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close dropdown by removing focus
      document.activeElement.blur();
    });
  });
});