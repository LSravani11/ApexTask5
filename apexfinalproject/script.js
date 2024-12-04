function scrollToShop() {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total from saved cart

// Function to add items to the cart
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;
    updateCart();
    saveCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Function to update the cart display
function updateCart() {
    // Update cart button text
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.innerText = `Cart (${cart.length})`;
    }

    // Update cart items
    const cartItemsList = document.getElementById('cart-items');
    if (cartItemsList) {
        cartItemsList.innerHTML = ''; // Clear previous items
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.product} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItemsList.appendChild(li);
        });
    }

    // Update total price
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to clear the cart
function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
    saveCart();
}

// Function to show/hide the cart
function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
    }
}

// Function to redirect to the checkout page
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    }
}

// Load cart data on checkout page
function loadCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    if (checkoutItems) {
        checkoutItems.innerHTML = ''; // Clear any existing items
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.product} - $${item.price}`;
            checkoutItems.appendChild(li);
        });
    }

    const checkoutTotal = document.getElementById('checkout-total');
    if (checkoutTotal) {
        checkoutTotal.innerText = `$${totalPrice.toFixed(2)}`;
    }
}

// Handle checkout form submission (this is just for demo purposes)
document.querySelector('#checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your purchase!');
    clearCart();
    window.location.href = '/'; // Redirect to home page
});

window.onload = function() {
    // If we're on the checkout page, load cart data
    if (window.location.pathname.includes('checkout.html')) {
        loadCheckout();
    }
    updateCart(); // Ensure cart UI updates on other pages
};
