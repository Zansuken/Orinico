function convertPrice(itemPrice) {
    let price = `${itemPrice}`
    price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price / 100)
    return price
}

let basket = JSON.parse(localStorage.getItem('cameras')) || [];

function clearBasket() {
    localStorage.clear()
}


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