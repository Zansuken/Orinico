fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    console.log(value);
    const layout = document.querySelector("article");
    
    for (const card of value) {

        const newDiv = document.createElement('div')
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