// public/script.js

// Handle the image carousel for the home page
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

// This function runs when the page is fully loaded
window.onload = function() {
  // Start the carousel function on the homepage
  if (document.body.contains(document.querySelector(".carousel"))) {
    showCarousel();
  }

  // Fetch and display recipe cards
  const recipeList = document.getElementById("recipe-list");

  fetch("/recipes/all")
    .then((response) => response.json())
    .then((data) => {
      // Limit the number of recipes shown on the homepage to 6
      const recipesToShow = data.slice(0, 6);

      recipesToShow.forEach((recipe) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded overflow-hidden";
        card.innerHTML = `
          <img src="${recipe.image || '/default-recipe.jpg'}" alt="${recipe.title}" class="w-full h-40 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-bold text-primary">${recipe.title}</h3>
            <p class="text-gray-500 text-sm mb-2">${recipe.cuisineType}</p>
            <h4 class="font-semibold text-gray-600 text-sm mb-2">Ingredients:</h4>
            <ul class="list-disc list-inside text-gray-600 text-sm">
              ${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <p class="text-gray-500 text-xs mt-4">Created by: ${recipe.createdBy || "Unknown"}</p>
            <a href="/recipes/${recipe._id}" class="text-accent hover:underline text-sm font-medium block mt-2">View Recipe</a>
          </div>
        `;
        recipeList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
};



