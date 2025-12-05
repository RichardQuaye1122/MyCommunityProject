// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const signUpForm = document.getElementById("signUpForm");
  const signInForm = document.getElementById("signInForm");
  const toSignIn = document.getElementById("toSignIn");
  const toSignUp = document.getElementById("toSignUp");
  const joinNowNav = document.getElementById("joinNowNav");
  const joinNowMobile = document.getElementById("joinNowMobile");

  // Mobile Menu Toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth Scroll with Offset
  const headerHeight = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
          if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
          }
        }
      }
    });
  });

  // Form Switching Animation
  function showSignUp() {
    if (signUpForm && signInForm) {
      signUpForm.style.transform = "translateX(0)";
      signUpForm.style.opacity = "1";
      signInForm.style.transform = "translateX(100%)";
      signInForm.style.opacity = "0";
    }
  }

  function showSignIn() {
    if (signUpForm && signInForm) {
      signUpForm.style.transform = "translateX(-100%)";
      signUpForm.style.opacity = "0";
      signInForm.style.transform = "translateX(0)";
      signInForm.style.opacity = "1";
    }
  }

  toSignIn?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignIn();
  });

  toSignUp?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignUp();
  });

  joinNowNav?.addEventListener("click", () => setTimeout(showSignUp, 600));
  joinNowMobile?.addEventListener("click", () => setTimeout(showSignUp, 600));

  // Init: Show Sign Up by default
  showSignUp();
});