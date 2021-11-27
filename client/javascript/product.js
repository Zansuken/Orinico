const layout = document.querySelector("#product_view")

const camerasUrl = 'http://localhost:3000/api/cameras'


const allCameras = fetch(camerasUrl);

allCameras.then(async function(response) {
    if (response.ok) {
        return response.json()
    } else {
        console.log('c\'est pas ok');
    }
})
.then(async function(value) {
    
    let url = window.location.search
    url = url.substring(5, url.length)
    console.log(value);

    
    
    for (const card of value) {
        if (card._id === url) {
            function convertPrice() {
                let price = `${card.price}`
                price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR'}).format( price / 100 )
                return price
            }
            
            const newDiv = document.createElement('div')
            let itemPrice = convertPrice(card.price)
            

            newDiv.innerHTML = `
            <div class="card_product">
                
                    <img src="${card.imageUrl}" alt="camera">
                    <div class="details_products">
                        <div class="description_head">
                            <h2>${card.name}</h2>
                            <span>${itemPrice}</span>
                        </div>
                        <p>${card.description}</p>
                        <div class="card_footer">
                            <div class="option_selection">
                                <span>Select your lense</span>
                                <select name="lenses" id="lenses_selection">
                                    ${card.lenses.map(l => `<option value="${l}">${l}</option>`).join("")}
                                </select>
                            </div>
                            <button><img src="images/add-to-cart.svg" alt"add to cart illustration"></button>
                        </div>
                    </div>
                
            </div>
            `
            layout.append(newDiv)
        }
    }

})
.catch(function(error) {
    console.log('Vraiment, ça va pas...' + error.message);
})