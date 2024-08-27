document.addEventListener("DOMContentLoaded", function () {



function toggleMenu() {
  const navLinks = document.querySelector('#goldsmith');
  const hamburger = document.querySelector(' .hamburger');

  // Toggle class 'active' on hamburger and nav-links
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');


  
}

const hamburger = document.querySelector('nav');
console.log(hamburger);

})


