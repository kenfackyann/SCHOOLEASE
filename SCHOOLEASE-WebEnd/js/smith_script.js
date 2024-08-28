document.addEventListener("DOMContentLoaded", function () {





})



function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector(' .hamburger');

  // Toggle class 'active' on hamburger and nav-links
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');


  
}