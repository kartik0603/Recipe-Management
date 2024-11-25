

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
  
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(form);
        const data = {
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          nationality: formData.get("nationality"),
        };
  
        fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Registration successful!");
            window.location.href = "/login"; // Redirect
          } else {
            alert("Registration failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an issue registering. Please try again.");
        });
      });
    }
  });
  