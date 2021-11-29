fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    console.log(value);
    const layout = document.querySelector("article");

    const orderRef = Math.random().toString(36).substr(2, 10);

        const newDiv = document.createElement('div')
        let itemPrice = convertPrice(`${value[0].price}`);
        let taxesFee = convertPrice(value[0].price * 0.2)
        let itemProductPage = value[0]._id
        newDiv.innerHTML = `
            <div id="payment_view">
                <h2>Order Summary</h2>
                <span>Order reference: <strong>${orderRef}</strong></span>
                <span>Shipping: <strong>free</strong></span>
                <span>Taxes: <strong>${taxesFee}</strong></span>
                <span>Total: <strong>${itemPrice}</strong></span>
                <div id="payments_methods">
                    <img src="images/visa-icon.svg" alt="visa icon">
                    <img src="images/master-card-icon.svg" alt="master card icon">
                    <img src="images/paypal-icon.svg" alt="paypal icon">
                </div>
                <button id="pay_button">Continue to secure payment</button>
                <a href="cart.html">Cancel payment</a>
            </div>
        `
        layout.append(newDiv)

})
.catch(function(err) {
    return err
})