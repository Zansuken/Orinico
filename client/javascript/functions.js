// Convert any numbers to a european currency format

function convertPrice(itemPrice) {
    let price = `${itemPrice}`
    price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price / 100)
    return price
}

// Define objects in the localStorage

let basket = JSON.parse(localStorage.getItem('cameras')) || [];
let totalAmount = JSON.parse(localStorage.getItem('total')) || [];
let orderDatas = JSON.parse(localStorage.getItem('order')) || [];

// Clear all objects from the localStorage

function clearBasket() {
    localStorage.clear()
}
localStorage.getItem('order')

// Define globally the total amount in charge for the client

let totalToPay = 0


// Define a type class for the items in the localStorage
class Item {
    constructor(id, name, price, description, imageUrl, quantity, option) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.option = option;
    }
}

const cartList = document.querySelector("#cart_ul");

function removeFromBasket() {
    for (const item of basket) {
        const singleDeleteBtn = document.querySelector('#delete_button' + (item.id + item.option).replace('.', '').replace(' ', ''))
        let itemId = item.id
        let itemOption = item.option.replace('.', '').replace(' ', '')
        let checkId = itemId + itemOption
        let checkBtnId = "delete_button" + itemId + itemOption
        if (singleDeleteBtn.getAttribute('id') == checkBtnId) {
            console.log('say Hello');
            document.getElementById(checkId).remove()
        }
    }
}

// Function to refresh cart icon

const totalItemsInCartView = document.createElement('span')
totalItemsInCartView.setAttribute('id', 'number_of_item_in_cart')
document.querySelector('#cartButton').appendChild(totalItemsInCartView)
function refreshCartIcon() {
    if (basket == 0) {
        totalItemsInCartView.style.display = "none"
    } else {
        totalItemsInCartView.style.display = "inline"
        let quantity = 0
        for (const item of basket) {
            quantity = quantity + item.quantity
            console.log(quantity);
            totalItemsInCartView.textContent = quantity
        }

    }


}
refreshCartIcon()

// Check if basket is empty

function checkIfBasketEmpty() {
    if (basket.length == 0) {
        const newDiv = document.createElement('div')
        const cartView = document.querySelector('.cart_list')
        const cartPreview = document.querySelector('#cart_preview')

        cartList.remove()
        cartPreview.style.display = "none"


        newDiv.innerHTML = `
        <div id="empty_cart">
            <h2>There was nothing in your cart :(...</h2>
            <a href="index.html">Go back to shopping!</a>
        </div>
        `
        cartView.append(newDiv)
    }
}