const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const navigationButtons = document.querySelectorAll("aside .sidebar a");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
 
})

navigationButtons.forEach(button => {
  button.addEventListener("click", () => {
    navigationButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';

    })

    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');
  


    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');

    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

} )



    // Toggle theme function
    var isDarkMode = false;
    var toggleButton = document.getElementById('themeToggle');

    toggleButton.addEventListener('click', function() {
      isDarkMode = !isDarkMode;
      updateChartTheme();
    });

 
  


  