fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(async function(value) {
    
    console.log(value);
    const layout = document.querySelector("article");
    
    const Card = class {
        constructor(name, image, description, price) {
            this.name = name
            this.image = image
            this.description = description
            this.price = price
        }
    }
    
    for (const card of value) {

        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <div class="card">
            <img src="${card.imageUrl}" alt="camera">
            <div class="details">
                <h2>${card.name}</h2>
                <p>${card.description}</p>
                <span>${card.price}</span>
            </div>
        </div>
        `
        layout.append(newDiv)
    }

})
.catch(function(err) {
    return err
})