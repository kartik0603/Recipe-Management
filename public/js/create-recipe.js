

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("create-recipe-form");
  
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(form);
        
        // Prepare the data to send to the backend
        const data = {
          title: formData.get("title"),
          ingredients: formData.get("ingredients"),
          instructions: formData.get("instructions"),
          cuisineType: formData.get("cuisineType"),
          image: formData.get("image") 
        };
  
        fetch("/create-recipe", {
          method: "POST",
          body: formData, 
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Recipe created successfully!");
            window.location.href = "/"; // 
          } else {
            alert("There was an issue creating the recipe. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an issue with the form submission.");
        });
      });
    }
  });
  