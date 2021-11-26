const layout = document.querySelector("article")

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
    const newImg = document.createElement("img")
    const newName = document.createElement("span")
    const newDescription = document.createElement("p")
    const newPrice = document.createElement("span")
    console.log(value);

    newImg.setAttribute("src", value[0].imageUrl)
    newName.innerHTML = value[0].name
    newDescription.innerHTML = value[0].description
    newPrice.innerHTML = value[0].price

    layout.append(newImg, newName, newDescription, newPrice)
})
.catch(function(error) {
    console.log('Vraiment, ça va pas...' + error.message);
})