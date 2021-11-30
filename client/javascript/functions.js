function convertPrice(itemPrice) {
    let price = `${itemPrice}`
    price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price / 100)
    return price
}

const minusBtn = document.querySelector("#minus_button")
const plusBtn = document.querySelector("#plus_button")