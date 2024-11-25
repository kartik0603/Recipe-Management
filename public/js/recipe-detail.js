document.addEventListener("DOMContentLoaded", async () => {
    const recipeId = new URLSearchParams(window.location.search).get("id");
    const recipeInfo = document.getElementById("recipe-info");
    const updateForm = document.getElementById("update-form");

    // Fetch recipe details and populate the form
    try {
      const response = await axios.get(`/recipes/${recipeId}`);
      const recipe = response.data.recipe;

      // Populate the details section
      recipeInfo.innerHTML = `
        <p><strong>Title:</strong> ${recipe.title}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisineType}</p>
        <img src="/${recipe.image}" alt="${recipe.title}" class="w-full max-h-64 object-cover mt-4">
      `;

      // Populate the form fields
      document.getElementById("recipe-id").value = recipe._id;
      document.getElementById("title").value = recipe.title;
      document.getElementById("ingredients").value = recipe.ingredients.join(", ");
      document.getElementById("instructions").value = recipe.instructions;
      document.getElementById("cuisineType").value = recipe.cuisineType;
    } catch (error) {
      recipeInfo.innerHTML = `
        <p class="text-red-500">Error loading recipe details: ${error.response?.data?.message || error.message}</p>
      `;
    }

    // Handle form submission to update the recipe
    updateForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Create FormData object to handle text and file fields
      const formData = new FormData(updateForm);

      try {
        await axios.put(`/recipes/${recipeId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Recipe updated successfully!");
        window.location.href = "/index.html"; // Redirect to index.html after success
      } catch (error) {
        alert(`Error updating recipe: ${error.response?.data?.message || error.message}`);
      }
    });
});
