fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {

    // Get the tag where new cart view will appear

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
    } else {

        // Loop inside localStorage "basket" object and create a new line in the cart for each items
    
        for (const item of basket) {
            let newLi = document.createElement("li")
            newLi.setAttribute("id", (item.id + item.option).replace('.', '').replace(' ', ''))
            newLi.innerHTML = `<img src="${item.imageUrl}" alt="camera" class="item_image">
            <div class="item_details">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <span id="option_selected"><strong>Options: ${item.option}</strong></span>
                <span id="item_quantity"><strong>Quantity: ${item.quantity}</strong> </span>
            </div>
            <div class="item_side">
                <div class="item_buttons">
                <button class="delete_buttons" id="delete_button${(item.id + item.option).replace('.', '').replace(' ', '')}"><img src="images/delete.svg" alt="rubish container icon"></button>
                </div>
                <span id="selected_item_total">${convertPrice(item.price * item.quantity)}</span>
            </div>`
            cartList.appendChild(newLi)
        }

        const deleteButtons = document.querySelectorAll('.delete_buttons')
        console.log(deleteButtons.length);
        const liId = document.querySelectorAll('#cart_ul li')
        console.log(liId.length);

        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click',function (e) {      
              liId[i].remove()
              basket.splice(i, 1)
                localStorage.setItem('cameras', JSON.stringify(basket))
                console.log(basket);
                if (basket  == []) {
                    window.location.reload()
                }
            } , false);
         }
    
        // Loop inside localStorage "basket" object then set total in charge using quantities and prices of items
        // Send updated total to localStorage "totalToPay"
    
        for (const item of basket) {
            totalToPay = totalToPay += (item.price * item.quantity);
            localStorage.setItem("total", JSON.stringify(totalToPay));
        }
    
        // Update total in charge view
    
        document.querySelector('#cart_preview span').innerHTML = "Total: " + convertPrice(totalToPay);
    
        // Clear all localStorage items then reload the page to refresh view
        
        document.querySelector('#cart_preview #delete_button').addEventListener('click', () => {
            clearBasket()
            window.location.reload()
        })
    }

})
.catch(function(err) {
    return err
})