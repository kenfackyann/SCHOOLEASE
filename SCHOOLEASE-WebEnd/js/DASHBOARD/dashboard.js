const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const chartTitles = document.querySelectorAll(" .chart-title-options a");
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

// JSON data for slides
const slideData = [
    {
        image: '../../img/dashboard_images/exhist.jpg',
        title: 'YIBS',
 
    },
    {
        image: '../../img/dashboard_images/exhist.jpg',
        title: 'EXHIST',
     
    },
    {
        image: '../../img/dashboard_images/exhist.jpg',
        title: 'ICT University',
    },
    {
        image: '../../img/dashboard_images/exhist.jpg',
        title: 'SOA',

    }
  ];
  
  // Function to create slide elements
  function createSlides(slides) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    slides.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('swiper-slide');
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}" class="card-image">
            
                <h3 class="card-title">${slide.title}</h3>
                <div class="card-details"><strong><a href="#">View More</a><strong>
            </div>
        `;
        swiperWrapper.appendChild(slideElement);
    });
  }
  
  // Create slides
  createSlides(slideData);
  
  // Initialize Swiper
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    centeredSlides: false,
  
    effect: 'slide', // Default sliding effect with easing
    freeMode: true, // Allow user full control over the position
    breakpoints: {
        375: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });




  
  // BAR CHART
 var chartOptions = {
      chart: {
        type: 'bar',
        height: 330,
        background: 'var(--bg-color-light)', // Use CSS variable for background color
        foreColor: 'var(--text-color-light)' // Use CSS variable for text color
      },
      series: [{
        name: '% passed',
        data: [96, 80, 65, 49, 78]
      }],
      xaxis: {
        categories: ['YIBS', 'NAHPI', 'ICTU', 'EXHIST', 'FET']
      }
    };

    var chart = new ApexCharts(document.querySelector("#bar-chart"), chartOptions);
    chart.render();

    // Toggle theme function
    var isDarkMode = false;
    var toggleButton = document.getElementById('themeToggle');

    toggleButton.addEventListener('click', function() {
      isDarkMode = !isDarkMode;
      updateChartTheme();
    });

 
  
// add active class

chartTitles.forEach(title => {
  title.addEventListener('click', () => {
    // Prevent the default link behavior


    // Remove the 'chart-title-active' class from all links
    chartTitles.forEach(t => {
      t.classList.remove("chart-title-active");
    });

    // Add the 'chart-title-active' class to the clicked link
    title.classList.add("chart-title-active");
  });
});


  