fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    console.log(value);
    const layout = document.querySelector("#cart_view");
    const newDiv = document.createElement('div')
    let totalSelected = 1
    let totalPrice = convertPrice(totalSelected * value[0].price)
    

    newDiv.innerHTML = `
    <div class="cart_list">
        <ul>
            <li>
                <img src="${value[0].imageUrl}" alt="camera" class="item_image">
                <div class="item_details">
                    <h2>${value[0].name}</h2>
                    <p>${value[0].description}</p>
                    <span id="option_selected"><strong>Options:</strong> ${value[0].lenses[0]}</span>
                    <span id="item_quantity"><strong>Quantity:</strong> ${totalSelected}</span>
                </div>
                <div class="item_side">
                    <div class="item_buttons">
                        <button id="update_button"><img src="images/update.svg" alt="pencil icon"></button>
                        <button id="delete_button"><img src="images/delete.svg" alt="rubish container icon"></button>
                    </div>
                    <span id="selected_item_total">${totalPrice}</span>
                </div>
            </li>
        </ul>
    </div>
    `
    layout.append(newDiv)

})
.catch(function(err) {
    return err
})