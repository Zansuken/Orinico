fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    const cartList = document.querySelector("#cart_ul");

    
    for (const item of basket) {
        let newLi = document.createElement("li")
        newLi.innerHTML = `<img src="${item.imageUrl}" alt="camera" class="item_image">
        <div class="item_details">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <span id="option_selected"><strong>Options: ${item.option}</strong></span>
            <span id="item_quantity"><strong>Quantity: ${item.quantity}</strong> </span>
        </div>
        <div class="item_side">
            <div class="item_buttons">
            <button id="delete_button"><img src="images/delete.svg" alt="rubish container icon"></button>
            </div>
            <span id="selected_item_total">${convertPrice(item.price * item.quantity)}</span>
        </div>`
        cartList.appendChild(newLi)
    }

    
    for (const item of basket) {
        totalToPay = totalToPay += (item.price * item.quantity);
        localStorage.setItem("total", JSON.stringify(totalToPay));
    }

    
    document.querySelector('#cart_preview span').innerHTML = "Total: " + convertPrice(totalToPay);

    document.querySelector('#cart_preview #delete_button').addEventListener('click', () => {
        clearBasket()
        window.location.reload()
    })
})
.catch(function(err) {
    return err
})