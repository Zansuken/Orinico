let actualAmount = 0


fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(async function (value) {

        let url = window.location.search
        url = url.substring(5, url.length)

        for (const card of value) {
            if (card._id === url) {
                document.title = "Orinoco | " + card.name

                const newImgUrl = document.querySelector("#product_img")
                const newName = document.querySelector(".description_head h2")
                const newPrice = document.querySelector(".description_head span")
                const newDescription = document.querySelector("#card_description")
                const newOptions = document.querySelector("#lenses_selection")

                let newAmount = document.querySelector("#actual_amount_selected")
                const minusBtn = document.querySelector("#minus_button")
                const plusBtn = document.querySelector("#plus_button")
                const addToCartBtn = document.querySelector("#send_to_cart_button")
                const selector = document.querySelector("#lenses_selection")

                newImgUrl.setAttribute("src", card.imageUrl)
                newName.innerHTML = card.name
                newPrice.innerHTML = convertPrice(card.price)
                newDescription.innerHTML = card.description
                newOptions.innerHTML = `${card.lenses.map(l => `<option value="${l}">${l}</option>`).join("")}`
                
                minusBtn.addEventListener("click", () => {
                    if (actualAmount > 0) {
                        actualAmount--
                    } else {
                        return
                    }
                    newAmount.innerHTML = actualAmount
                })

                plusBtn.addEventListener("click", () => {
                    actualAmount++
                    newAmount.innerHTML = actualAmount
                })
                
                selector.addEventListener("change", (e) => {
                })

                
                addToCartBtn.addEventListener("click", (e) => {
                    e.preventDefault()

                    const newItemRef = Math.random().toString(36).substr(2, 10);

                    let newItem = new Item(
                        newItemRef,
                        card.name,
                        card.price,
                        card.description,
                        card.imageUrl,
                        actualAmount,
                        selector.value
                    )

                    console.log(newItem);
                    if (actualAmount > 0) {
                        basket.push(newItem)
                    } else {
                        alert("Nothing to add")
                    }
                    localStorage.setItem("cameras", JSON.stringify(basket))
                    actualAmount = 0
                    newAmount.innerHTML = actualAmount
                })
                

            }
        }

    })
    .catch(function (error) {
        console.log('Vraiment, ça va pas...' + error.message);
    })