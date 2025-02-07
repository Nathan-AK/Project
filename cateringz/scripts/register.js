function validateForm() {
  var isValid = true;

  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var terms = document.getElementById("terms").checked;

  // Validate username
  if (username.length < 6) {
    document.getElementById("usernameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("usernameError").style.display = "none";
  }

  // Validate email
  if (!email.includes("@")) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // Validate password
  if (password.length < 6) {
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("passwordError").style.display = "none";
  }

  // Validate DOB
  if (day === "" || month === "" || year === "") {
    document.getElementById("dobError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("dobError").style.display = "none";
  }

  // Validate terms
  if (!terms) {
    document.getElementById("termsError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("termsError").style.display = "none";
  }

  if (isValid) {
    alert("Berhasil register!");
  }
}

// Hide all validation messages on load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("usernameError").style.display = "none";
  document.getElementById("emailError").style.display = "none";
  document.getElementById("passwordError").style.display = "none";
  document.getElementById("dobError").style.display = "none";
  document.getElementById("termsError").style.display = "none";
});
