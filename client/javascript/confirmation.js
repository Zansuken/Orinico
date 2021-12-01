fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    const layout = document.querySelector("article");
    const newDiv = document.createElement('div')
    let total = totalAmount

    if (totalAmount > 0) {
        const orderRef = Math.random().toString(36).substr(2, 10);

        let taxesFee = convertPrice(total * 0.2)
        newDiv.innerHTML = `
        <div id="payment_view">
            <h2>Order Summary</h2>
            <span>Order reference: <strong>${orderRef}</strong></span>
            <span>Shipping: <strong>free</strong></span>
            <span>Taxes: <strong>${taxesFee}</strong></span>
            <span>Total: <strong>${convertPrice(total)}</strong></span>
            <div id="payments_methods">
                <img class="payment_options" src="images/visa-icon.svg" alt="visa icon">
                <img class="payment_options" src="images/master-card-icon.svg" alt="master card icon">
                <img class="payment_options" src="images/paypal-icon.svg" alt="paypal icon">
            </div>
            <button id="pay_button">Continue to secure payment</button>
            <a href="cart.html">Cancel payment</a>
        </div>
    `
    layout.append(newDiv)
    const paymentMethodBtn = document.querySelectorAll('.payment_options')
    for (const btn of paymentMethodBtn) {
        let backGroundWhite = false
        btn.addEventListener('click', () => {
            if (backGroundWhite === false) {
                btn.style.background = "rgb(56, 19, 156)"
                backGroundWhite = true
            } else {
                btn.style.background = "white"
                backGroundWhite = false
            }
        })
    }

    const submitLayout = document.querySelector('#payment_view')
    document.querySelector('#pay_button').addEventListener('click', () => {
        submitLayout.innerHTML = `
        <h2>Last step to order!</h2>
        <form>
            <span>First Name:</span>
            <input type="text"></input>
            <span>Last Name:</span>
            <input type="text"></input>
            <span>Address:</span>
            <input type="text"></input>
            <span>City:</span>
            <input type="text"></input>
            <span id="mail_input">E-mail:</span>
            <input type="email"></input>
            <span style="border: none"></span>
            <input type="submit" value="Order" id="order_button">
        </form>
    `
    

    })
    
    } else {
        newDiv.innerHTML = `
        <div id="empty_cart">
            <h2>There was nothing in your cart :(...</h2>
            <a href="index.html">Go back to shopping!</a>
        </div>
    `
    layout.append(newDiv)
    }


    

})
.catch(function(err) {
    return err
})