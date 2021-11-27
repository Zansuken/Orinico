fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    console.log(value);
    const layout = document.querySelector("article");
    
    for (const card of value) {

        const newDiv = document.createElement('div')
        function convertPrice() {
            let price = `${card.price}`
            price = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR'}).format( price / 100 )
            return price
        }
        let itemPrice = convertPrice(`${card.price}`);
        let itemProductPage = card._id
        newDiv.innerHTML = `
        <div class="card">
            <ul>
            </ul>
        </div>
        `
        layout.append(newDiv)
    }

})
.catch(function(err) {
    return err
})