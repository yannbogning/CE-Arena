// ================================
// CE ARENA
// Main JavaScript
// ================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// Mobile navigation

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-active");

});


// Close mobile navigation after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-active");

    });

});


// Simple welcome message

console.log("CE ARENA loaded successfully 🎮");
