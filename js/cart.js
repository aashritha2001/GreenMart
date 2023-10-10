// Adding to Cart function
function addToCart(itemName, itemPrice, itemId) {

    // Assuming you have an inventory object with item quantities
    var inventory = {
        // Fresh Produce
        'Fresh Tomato on the Vine': 20,
        'Fresh Strawberries': 3,
        'Orange': 5,

        // Frozen 
        'Drumstick Ice Cream Cones': 20,
        'Arbys Seasoned Curly Fries': 3,
        'Red Baron Frozen Pizza': 5,


        // Pantry
        'Banza Chickpea Rotini': 20,
        'Hunts Tomato Paste': 5,
        'Crushed Red Peppers': 3,

        // Breakfast
        'Kelloggs Krave Cereal': 5,
        'Eggo Homestyle Frozen Waffles': 20,
        'Honey Nut Cheerios Cereal': 5,

        // Candy 
        'Milk Duds Chocolate Candy': 10,
        'Twix Caramel Minis Candy': 5,
        'Lindor Chocolate Truffles': 3,

        // Snacks
        'Snack Pack Chocolate Pudding': 10,
        'Miss Vickies Potato Chips': 5,
        'OREO Chocolate Cookies': 3,

        // Baking
        'Pillsbury Chocolate Cake Mix': 25,
        'Great Value Baking Soda': 3,
        'Betty Crocker Cookie Mix': 5

    };

    // Get existing cart items or create an empty array
    var cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];


    var itemCount = document.querySelector(`#${itemId} .item-count`).value;
    itemCount = parseInt(itemCount, 10);

    // Check if the item is already in the cart
    var existingItem = cartItems.find(item => item.name === itemName);


    if (existingItem) {
        var count = Number(existingItem.quantity);
        count += itemCount

        if (count <= inventory[itemName]) {
            // If item exists, update the quantity
            existingItem.quantity = count;
        }
        else {
            alert(`${itemName} Out of Stock. Limited to ${inventory[itemName]} available.`);
        }

    } else {
        if (itemCount <= inventory[itemName]) {
            // If item doesn't exist, add a new entry
            cartItems.push({ name: itemName, price: itemPrice, quantity: itemCount });
        }
        else {
            alert(`${itemName} Out of Stock. Limited to ${inventory[itemName]} available.`);
        }


    }

    // Store the updated cart back in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cartItems));

    removeAllCartRows();
    addAllCartRows();

    showCart();
}

function showCart() {
    // Get existing cart items or create an empty array
    var cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cartItems) {
        var cartSummary = cartItems.map(function (item) {
            return `${item.name} - Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}`;
        }).join("\n");
        // alert("Items in Cart:\n" + cartSummary);
    } else {
        alert("Cart is empty.");
    }
}


function removeAllCartRows() {
    var table = document.getElementById('shopping-cart-side');
    var tbody = table.getElementsByTagName('tbody')[0];

    // Remove all child elements from the tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function addAllCartRows() {
    var cartItems = JSON.parse(sessionStorage.getItem('cart'));

    var totalCount = 0;

    if (cartItems && Array.isArray(cartItems)) {
        cartItems.forEach(function (item) {
            addToCartUI(item.name, item.price, item.quantity);
            totalCount += ((parseFloat(item.price) * parseInt(item.quantity)));
            console.log(totalCount);
        });
    }

    // Remove Total tfooter
    var table = document.getElementById('shopping-cart-side');
    var tfoot = table.getElementsByTagName('tfoot')[0];

    // Check if <tfoot> exists before attempting to remove it
    if (tfoot) {
        tfoot.parentNode.removeChild(tfoot);
    }

    // Add New Footer
    var newTfoot = document.createElement('tfoot');
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td colspan="2">$${parseFloat(totalCount).toFixed(2)}</td>
    `;
    newTfoot.appendChild(newRow);

    // Append the new <tfoot> to the table
    table.appendChild(newTfoot);

}


function addToCartUI(itemName, itemPrice, itemQuantity) {


    // Get the table and tbody elements
    var table = document.getElementById('shopping-cart-side');
    var tbody = table.getElementsByTagName('tbody')[0];

    // Create a new row (tr element)
    var newRow = document.createElement('tr');

    // Define the HTML content for the new row
    var name = itemName;
    if (itemName.length > 15 && !window.location.pathname.endsWith('Cart.html') ) {
        var name = itemName.substring(0, 15);
        name += '...';
    }

    newRow.innerHTML = `
        <td><strong>${name}</strong></td>
        <td>$${parseFloat(itemPrice).toFixed(2)}</td>
        <td>${itemQuantity}</td>
        <td>$${(parseFloat(itemPrice) * parseInt(itemQuantity)).toFixed(2)}</td>
    `;

    // Append the new row to the tbody
    tbody.appendChild(newRow);
}

//  This runs on page startup 
document.addEventListener('DOMContentLoaded', function () {
    removeAllCartRows();
    addAllCartRows();

    if (sessionStorage.length == 0) {
        // Show message saying cart is empty
        var table = document.getElementById('shopping-cart-side');
        var tbody = table.getElementsByTagName('tbody')[0];

        // Create a new row (tr element)
        var newRow = document.createElement('tr');

        // Define the HTML content for the new row
        newRow.innerHTML = `
        <td colspan="4"><strong>Cart is Empty</strong></td>`;
        // Append the new row to the tbody
        tbody.appendChild(newRow);

    }
});


// COUNTER in item-card
function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
}

function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
}


function emptyCart() {
    sessionStorage.clear();
    removeAllCartRows();

    // Show message saying cart is empty
    var table = document.getElementById('shopping-cart-side');
    var tbody = table.getElementsByTagName('tbody')[0];
    // Create a new row (tr element)
    var newRow = document.createElement('tr');

    // Define the HTML content for the new row
    newRow.innerHTML = `
        <td colspan="4"><strong>Cart is Empty</strong></td>
    `;
    // Append the new row to the tbody
    tbody.appendChild(newRow);


    // Check if <tfoot> exists and remove it
    var tfoot = table.getElementsByTagName('tfoot')[0];
    if (tfoot) {
        tfoot.parentNode.removeChild(tfoot);
    }

    // Reset Total to 0
    var newTfoot = document.createElement('tfoot');
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td colspan="2">$0.00</td>
    `;
    newTfoot.appendChild(newRow);

    // Append the new <tfoot> to the table
    table.appendChild(newTfoot);
}

