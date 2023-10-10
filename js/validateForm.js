function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("pnumber").value;
    var email = document.getElementById("email").value;
    var comment = document.getElementById("comment").value;
    
    var namePattern = /^[A-Z][a-z]+$/;
    var phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    var emailPattern = /.*@.*\..*/;;

    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        alert("First name and last name should be alphabetic and be capitalized.");
        return false;
    }

    if (firstName === lastName) {
        alert("First name and last name cannot be the same.");
        return false;
    }

    if (!phonePattern.test(phoneNumber)) {
        alert("Phone number must be formatted as (123) 456-7890.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (comment.length < 10) {
        alert("Comment must be at least 10 characters long.");
        return false;
    }

    // Print values to console
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    console.log("Comment:", comment);

    alert("Form submitted successfully!");
    return true;
}