

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
  
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(form);
        const data = {
          email: formData.get("email"),
          password: formData.get("password")
        };
  
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Login successful!");
            window.location.href = "/"; // Redirect to homepage or user dashboard
          } else {
            alert("Invalid email or password. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an issue logging in. Please try again.");
        });
      });
    }
  });
  