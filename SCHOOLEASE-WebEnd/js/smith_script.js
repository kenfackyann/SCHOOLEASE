document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('articles-slider');
    const showMoreBtn = document.getElementById('show-more');
  
    let currentScrollPosition = 0;
    const scrollAmount = 230; // Width of the card + margin
  
    function autoScroll() {
      if (slider.classList.contains('grid-view')) return;
      currentScrollPosition += scrollAmount;
      if (currentScrollPosition >= slider.scrollWidth) {
        currentScrollPosition = 0;
      }
      slider.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
      });
    }
  
    setInterval(autoScroll, 1000);
  
    showMoreBtn.addEventListener('click', () => {
      slider.classList.toggle('grid-view');
    });
  });
  