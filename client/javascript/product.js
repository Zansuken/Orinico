// View of single product

// Define a base amount of selected product

let actualAmount = 0

fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(async function (value) {

        // Reach actual URL then cut it from it 5th character to the end of it

        let url = window.location.search
        url = url.substring(5, url.length)

        // Loop inside datas of api/cameras

        for (const card of value) {
            if (card._id === url) {

                // Change title to include selected item name

                document.title = "Orinoco | " + card.name

                // Define all view parts

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

                // Set informations inside view parts

                newImgUrl.setAttribute("src", card.imageUrl)
                newName.innerHTML = card.name
                newPrice.innerHTML = convertPrice(card.price)
                newDescription.innerHTML = card.description

                // Return options inside selector

                newOptions.innerHTML = `${card.lenses.map(l => `<option value="${l}">${l}</option>`).join("")}`
                
                // Add events to view buttons

                    // Decrement actual item amount selected

                minusBtn.addEventListener("click", () => {
                    if (actualAmount > 0) {
                        actualAmount--
                    } else {
                        return
                    }
                    newAmount.innerHTML = actualAmount
                })

                    // Increment actual item amount selected

                plusBtn.addEventListener("click", () => {
                    actualAmount++
                    newAmount.innerHTML = actualAmount
                })
                
                // Add selected item(s) to localStorage

                addToCartBtn.addEventListener("click", (e) => {
                    e.preventDefault()

                    // Define an item reference by generating new string with random characters (a-z and numbers only)

                    const newItemRef = Math.random().toString(36).substr(2, 10);

                    // Create new item with the Item class

                    let newItem = new Item(
                        card._id,
                        card.name,
                        card.price,
                        card.description,
                        card.imageUrl,
                        actualAmount,
                        selector.value
                    )
                    
                    // Define a base state to check if the item already exists

                    let alreadyExist = false

                    // Define a variable that, if item exists, will be same as it index

                    let indexModification;

                    // Loop inside localStorage "basket" objects to change 

                    for (const item of basket) {
                        // Check if new item matches with an item already present
                        if (item.option == newItem.option && item.name == newItem.name) {
                            // If it does change existing check state to true and index variable to current item index
                            alreadyExist = true
                            indexModification = basket.indexOf(item)
                        }
                    }

                    // Check if amount selected is over zero and if so, push the new item inside the localStorage object "basket"
                    // If amount selected is over zero and item already exists, add new amount to it
                    // If none of this conditions matches return an alert

                    if (actualAmount > 0 && alreadyExist == false) {
                        basket.push(newItem);
                        localStorage.setItem("cameras", JSON.stringify(basket));
                    } else if (actualAmount > 0 && alreadyExist == true) {
                        basket[indexModification].quantity = newItem.quantity + basket[indexModification].quantity
                        localStorage.setItem("cameras", JSON.stringify(basket));
                    } else {
                        alert("Nothing to add")
                    }

                    // Reset amount selected to zero and chang its view
                    actualAmount = 0
                    newAmount.innerHTML = actualAmount
                })
                

            }
        }

    })
    .catch(function (error) {
        console.log('Vraiment, ça va pas...' + error.message);
    })