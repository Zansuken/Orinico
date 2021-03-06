const formLayout = document.querySelector('aside')

fetch("https://lit-ridge-00814.herokuapp.com/api/cameras")
    .then(response => response.json())
    .then(async function (value) {

        // Get the tag where new view will appear

        const layout = document.querySelector("article");
        const newDiv = document.createElement('div')

        // Define total price in charge

        let total = totalAmount

        if (totalAmount > 0) {

            // Create a new order reference by generating new string with random characters (a-z and numbers only)

            const orderRef = Math.random().toString(36).substr(2, 10);
            localStorage.setItem("order", JSON.stringify(orderRef));

            // Define a potential taxe from total in charge

            let taxesFee = convertPrice(total * 0.2)
            newDiv.innerHTML = `
            <div id="payment_view">
                <h2>Order Summary</h2>
                <span>Basket reference: <strong>${orderRef}</strong></span>
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

            // Get the payment methods buttons

            const paymentMethodBtn = document.querySelectorAll('.payment_options')

            // Loop inside payment methods buttons
            // Change background on click to show its selected

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

            // Get the form view for confirmation

            const submitLayout = document.querySelector('#payment_view')

            // When user click to confirm his cart, show form view

            document.querySelector('#pay_button').addEventListener('click', () => {
                submitLayout.style.display = "none"
                formLayout.style.transform = "translateX(-50%)"
                formLayout.style.left = "50%"
                formLayout.style.opacity = "1"

            })

            // If cart is empty show this view instead

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
    .catch(function (err) {
        return err
    })

const singleWordRegex = /^(([a-zA-Z??-??]+[\s\-]{1}[a-zA-Z??-??]+)|([a-zA-Z??-??]+))$/
const spacedWordRegex = /^(([a-zA-Z??-??0-9]+[\s\-]{1}[a-zA-Z??-??0-9]+)){1,10}$/

const orderBtn = document.querySelector('#order_button')

let contact;
let products = []

orderBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const firstName = document.querySelector('#first_name')
    const lastName = document.querySelector('#last_name')
    const address = document.querySelector('#client_address')
    const city = document.querySelector('#city')
    const email = document.querySelector('#email')

    contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    for (const product of basket) {
        products.push(product.id)
    }

    console.log(contact.email);

    if (
        (singleWordRegex.test(contact.firstName) == true) &&
        (singleWordRegex.test(contact.lastName) == true) &&
        (spacedWordRegex.test(contact.address) == true) &&
        (singleWordRegex.test(contact.city) == true) &&
        (contact.email.length > 0)

    ) {

        fetch("https://lit-ridge-00814.herokuapp.com/api/cameras/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contact, products })
        })
            .then(async (response) => await response.json())
            .then(async (data) => {
                console.log(data);
                formLayout.style.textAlign = "center"
                formLayout.style.transform = "translateX(-50%)"
                formLayout.style.left = "50%"
                formLayout.innerHTML = `
                <h2>Thanks for order!</h2>
                <h3>Order reference: ${data.orderId}</h3>
                <img src="images/bye-illustration.jpg" id="bye_img">
                <a href="index.html">Go back to home page</a>
                `
                clearBasket()
            })
            .catch((error) => { return error })




    } else {

        // Add an error message on any invalid input from user

        if (singleWordRegex.test(contact.firstName) == false) {
            document.querySelector('#error_firstname').innerHTML = '3 to 12 characters, letters only'
        }
        if (singleWordRegex.test(contact.lastName) == false) {
            document.querySelector('#error_lastname').innerHTML = '3 to 12 characters, letters only'
        }
        if (spacedWordRegex.test(contact.address) == false) {
            document.querySelector('#error_address').innerHTML = 'Valid address only'
        }
        if (singleWordRegex.test(contact.firstName) == false) {
            document.querySelector('#error_city').innerHTML = 'Valid city only'
        }
        if (contact.email.length > 0) {
            document.querySelector('#error_email').innerHTML = 'Is not an email address'
        }
        console.log('Informations are not valid');
    }
})