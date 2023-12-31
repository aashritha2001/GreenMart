
// FILTERING CODE 
filterSelection('all')

function filterSelection(selected) { 
    var x, i;
    x = document.getElementsByClassName("item-card");
    if (selected == "all") selected = "";
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(selected) > -1) addClass(x[i], "show");

    }
}

// Show filtered elements
function addClass(element, name) {
    var i, first, second;
    first = element.className.split(" ");
    second = name.split(" ");
    for (i = 0; i < second.length; i++) {
        if (first.indexOf(second[i]) == -1) {
            element.className += " " + second[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, first, second;
    first = element.className.split(" ");
    second = name.split(" ");
    for (i = 0; i < second.length; i++) {
        while (first.indexOf(second[i]) > -1) {
            first.splice(first.indexOf(second[i]), 1);
        }
    }
    element.className = first.join(" ");
}

function searchInput() {
    var input, filter, foodList, itemCards, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    foodList = document.querySelector('.item-wrapper');
    itemCards = foodList.getElementsByClassName('item-card');
    var messageElement = document.getElementById('message'); 
    var matchingItems = false;

    // Check if input contains numbers
    if (/\d/.test(input.value)) {
        messageElement.innerHTML = "Numbers are not allowed. Please enter a valid search term."; // Set the message
        input.value = '';
        // display all cards again
        for (i = 0; i < itemCards.length; i++) {
            itemCards[i].style.display = ''; 
        } 
        return;
    }
    else{
        messageElement.innerHTML = '';
        for (i = 0; i < itemCards.length; i++) {
            txtValue = itemCards[i].textContent || itemCards[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                itemCards[i].style.display = '';
                matchingItems = true;
            } else {
                itemCards[i].style.display = 'none';
            }
        }
    }

    // If no matching items are found, display message
    if (!matchingItems) {
        messageElement.innerHTML = "No matching items";
    }

    
}