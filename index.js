// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Form switching for Sign In / Sign Up
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const toSignUp = document.getElementById("toSignUp");
const toSignIn = document.getElementById("toSignIn");

function switchForms(show, hide) {
  hide.classList.add("fade-out");
  hide.classList.remove("fade-in");
  setTimeout(() => {
    hide.classList.add("hidden");
    hide.classList.remove("fade-out");
    show.classList.remove("hidden");
    show.classList.add("fade-in");
  }, 300);
}

toSignUp.addEventListener("click", () => switchForms(signUpForm, signInForm));
toSignIn.addEventListener("click", () => switchForms(signInForm, signUpForm));
