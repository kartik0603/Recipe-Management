// carousel.js

let carouselIndex = 0;

function showCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");

  // Hide all slides
  slides.forEach((slide, index) => {
    slide.style.display = "none";
  });

  // Show the current slide
  if (carouselIndex >= slides.length) {
    carouselIndex = 0;
  }
  
  slides[carouselIndex].style.display = "block";
  carouselIndex++;

  // Change slide every 5 seconds
  setTimeout(showCarousel, 5000);
}

window.onload = function() {
  showCarousel();
};
