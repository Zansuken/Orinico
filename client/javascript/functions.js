function convertPrice(itemPrice) {
    let price = `${itemPrice}`
    price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price / 100)
    return price
}

let basket = JSON.parse(localStorage.getItem('cameras')) || [];
let totalAmount = JSON.parse(localStorage.getItem('total')) || [];


function clearBasket() {
    localStorage.clear()
}

let totalToPay = 0 


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