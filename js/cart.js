// Adding to Cart function
function addToCart(itemName, itemPrice, itemId) {

    // Assuming you have an inventory object with item quantities
    var inventory = {
        // Fresh Produce
        'Fresh Tomato on the Vine': 20,
        'Fresh Strawberries': 3,
        'Orange': 5,
        'Fresh Apple': 6,
        'Fresh Broccoli': 10,
        'Precut Pineapples': 15,
        'Fresh Rose Bouquet': 8,
        'Spinach Artichoke Dip': 12,
        'Fresh Pumpkin': 6,
        'Fruit Salad': 25,
        'Onions': 30,
        'Carrots': 18,

        // Frozen 
        'Drumstick Ice Cream Cones': 20,
        'Arbys Seasoned Curly Fries': 3,
        'Red Baron Frozen Pizza': 5,
        'DiGiorno Rising Crust Pizza': 20,
        'Tombstone Original Pizza': 3,
        'Lean Cuisine Frozen Meal': 5,
        'Stouffers Lasagna': 20,
        'Jimmy Dean Sausage, Egg & Cheese Croissant Sandwiches': 3,
        'Pillsbury Toaster Strudel': 5,
        'Nestle Toll House Chocolate Chip Cookie Dough': 20,
        'Haagen-Dazs Vanilla Almond Bar': 3,
        'Tyson Fully Cooked Grilled Chicken Breast Strips': 5, 
        'TGI Fridays Mozzarella Sticks': 20,

        // Pantry
        'Banza Chickpea Rotini': 20,
        'Hunts Tomato Paste': 5,
        'Crushed Red Peppers': 3,
        'Campbells Chicken Noodle Soup': 6,
        'Del Monte Green Beans': 10,
        'Progresso Traditional Italian-Style Wedding Soup': 15,
        'Green Giant Sweet Peas': 8,
        'Libbys Whole Kernel Sweet Corn': 12,
        'Bushs Best Original Baked Beans': 6,
        'Heinz Ketchup': 25,
        'Nutella Hazelnut Spread': 30,
        'Jif Creamy Peanut Butter': 18,
        'Welchs Concord Grape Jelly': 21,

        // Breakfast
        'Kelloggs Krave Cereal': 5,
        'Eggo Homestyle Frozen Waffles': 20,
        'Honey Nut Cheerios Cereal': 5,
        'Corn Flakes Cereal': 3,
        'Raisin Bran Cereal': 10,
        'Buttermilk Pancake Mix': 5,
        'Original Waffle Mix': 3,
        'Plain Bagels': 10,
        'Cinnamon Swirl Bread': 5,
        'Instant Oatmeal Variety Pack': 3,
        'Instant Grits': 10,

        // Candy 
        'Milk Duds Chocolate Candy': 10,
        'Twix Caramel Minis Candy': 5,
        'Lindor Chocolate Truffles': 3,
        'Snickers Candy Bar': 10,
        'M&Ms Milk Chocolate Candy': 5,
        'Twix Caramel Cookie Bars': 3,

        // Snacks
        'Snack Pack Chocolate Pudding': 10,
        'Miss Vickies Potato Chips': 5,
        'OREO Chocolate Cookies': 3,
        'Mini Pretzels': 10,
        'Mixed Nuts': 5,
        'Lays Classic Potato Chips': 3,


        // Baking
        'Great Value Baking Soda': 3,
        'Apple Pie Filling': 10,
        'Cherry Pie Filling': 5,
        'Pre-made Pie Crust': 3,
        'Graham Cracker Pie Crust': 10,
        'Vanilla Pudding Mix': 5,
        'Chocolate Pudding Mix': 3,
        '9-inch Pie Pan': 10

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
    if (itemName.length > 15 && !window.location.pathname.endsWith('Cart.html')) {
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

