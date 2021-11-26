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
    
    for (const iterator of value) {

        const test = new Card(iterator.name, iterator.imageUrl, iterator.description, iterator.price)
        const newDiv = document.createElement('div')
        const newImg = document.createElement('img')
        const newName = document.createElement('span')
        const newDescription = document.createElement('p')
        const newPrice = document.createElement('span')

        newImg.setAttribute('src', iterator.imageUrl)
        newName.innerHTML = "MODEL: " + test.name
        newDescription.innerHTML = "SPECS: " + test.description
        newPrice.innerHTML = "FOR: " + test.price + " €"
        layout.append(newDiv)
        newDiv.append(newImg, newName, newDescription, newPrice)
    }

})
.catch(function(err) {
    return err
})