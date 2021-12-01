fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    const layout = document.querySelector("article");
    
    for (const card of value) {

        const newDiv = document.createElement('div')
        let itemPrice = convertPrice(`${card.price}`);
        let itemProductPage = card._id
        newDiv.innerHTML = `
        <div class="card">
            <a href="/client/products.html?_id=${itemProductPage}">
                <img src="${card.imageUrl}" alt="camera">
                <div class="details">
                    <div class="description_head">
                        <h2>${card.name}</h2>
                        <span>${itemPrice}</span>
                    </div>
                    <p>${card.description}</p>
                </div>
            </a>
        </div>
        `
        layout.append(newDiv)
    }

})
.catch(function(err) {
    return err
})