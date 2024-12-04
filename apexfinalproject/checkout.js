// Function to validate the checkout form
function validateCheckout() {
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullName || !email || !address) {
        alert("Please fill out all fields before proceeding.");
    } else {
        // Alert confirming the purchase
        const purchaseConfirmation = confirm("Thank you for your purchase! We will send a confirmation email shortly. Click 'OK' to return to the previous page.");
        
        if (purchaseConfirmation) {
            // Go back to the previous page
            window.history.back();
        }
    }
}
