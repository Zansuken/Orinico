// Home page

fetch("https://lit-ridge-00814.herokuapp.com/api/cameras")
    .then(response => response.json())
    .then(async function (value) {

        // Get the tag where new view will appear

        const layout = document.querySelector("article");

        // Loop inside datas of api/cameras

        for (const card of value) {

            const newDiv = document.createElement('div')
            let itemPrice = convertPrice(`${card.price}`);
            let itemProductPage = card._id

            // Define the content of the home page view

            newDiv.innerHTML = `
        <div class="card">
            <a href="/products.html?_id=${itemProductPage}">
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
            // Add the new view to the page

            layout.append(newDiv)
        }

    })
    .catch(function (err) {
        return err
    })