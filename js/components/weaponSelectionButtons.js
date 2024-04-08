import { agentsPayloadValidation } from "../services/validations.js"

// This function handles the selection of different categories, type of weapons and skins for the weapon selection screen
const toggleCategory = () => {
    // Getting the category that was clicked from the local storage. This value is saved there by a function triggered when clicking any category button
    const clickedCategory = localStorage.getItem('selectedCategory')
    // Then I retrieve all the weapons from the object saved in the local storage to not continue making calls to the API
    const weaponsObject = JSON.parse(localStorage.getItem('weaponObject'))
    // ...and I change the weapons to display based on the clicked category. The available weapons are retrieved by the getWeaponTypeButtonsByCategory function
    const weaponsTypeButtons = getWeaponTypeButtonsByCategory(weaponsObject, clickedCategory)
    document.getElementById('weaponTypeDiv').innerHTML = weaponsTypeButtons

    // Once I have all the weapon buttons available for the category that was chosen, I proceed to handle the skin selection for each weapon based out on which weapon button gets selected.
    const allWeaponButtons = document.getElementsByTagName('button')
    for(let i=0; i<allWeaponButtons.length; i++){
        // To do so, I rettrieve all the buttons on the HTML page and make sure to add an event listener to the buttons that are used to select the type of weapon only
        if(allWeaponButtons[i].id.endsWith('-weaponButton')){
            allWeaponButtons[i].addEventListener('click',() => {
                // This way, whenever the user selects a type of weapon, the selected weapon gets handled by the function that creates the skin buttons
                let clickedWeapon = `${allWeaponButtons[i].id.split('-weaponButton')[0]}`
                const skinsTypeButtons = getSkinTypeButtonsByWeapon(weaponsObject, clickedWeapon)
                document.getElementById('skinTypeDiv').innerHTML = skinsTypeButtons

                // Once I have created all the skin cards I'm adding an event listener to every one of the to call the validator function that will handle the balance validation and the display of the current equipment after every skin selection
                const allSkinButtons = document.getElementsByClassName('skinButton')
                for(let i=0; i<allSkinButtons.length; i++){
                    allSkinButtons[i].addEventListener('click',agentsPayloadValidation)
                }
                })
            }
        }
    }

// This function creates the buttons for each weapon category and returns them as an HTML string to be appended to the main HTML structure by the script.js file when setting up the page on load
const getWeponCategoryButtons = (obj) => {
    let keys = Object.keys(obj).filter(key => key != 'null') // making sure that I don't pick up the category 'null' from the weapon with no assigned category on the CSGO-API response
    let buttonsHtmlString = ''
    for(let i=0; i<keys.length; i++){
        buttonsHtmlString += 
            `<button id='${keys[i]}-category' onclick="localStorage.setItem('selectedCategory','${keys[i]}');">
                ${keys[i]}
            </button>`
    }
    return buttonsHtmlString
}

// Similar to getWeaponCategoryButtons, this function returns a string to be used to create the buttons for the weapon types available for the previously selected category
const getWeaponTypeButtonsByCategory = (obj, category) => {
    // I filter out the 'availableRarities' key from the custom object that I've added to handle weapon/skin pricing on another stage of the project but would interfere with the names of the weapon types here
    let weaponTypes = Object.keys(obj[category]).filter(key => key != 'availableRarities')

    // I set the styling for the buttons HTML elements to be returned
    let buttonsHtmlString = `<div id='${category}-weapons-div' style="display: flex; flex-direction: column; width: 100%;">`
    for(let i=0; i<weaponTypes.length; i++){
        // Then I add a button for each one of the available weapon types
        buttonsHtmlString += `<button id='${weaponTypes[i]}-weaponButton'">${weaponTypes[i]}</button>`
    }
    // Closing the HTML div element
    buttonsHtmlString += `</div>`

    return buttonsHtmlString
}

// At last I create and return all the buttons for every skin of the selected category-weapon combination as a string to be used on an HTML element
// To do so, I pass as arguments an object with all the available weapons for my team, along with the type of weapon that was clicked, for which I will display all the available skins
const getSkinTypeButtonsByWeapon = (obj, weaponName) => {
    // I'll be using also the selected category to access the whole inventory object that I receive as an argument for this function
    const category = localStorage.getItem("selectedCategory")
    const skinsArray = obj[category][weaponName]
    // Once I get the array with the information for all the skins that are available, I create a card for each one of them
    let skinCards = skinsArray.map(element => {
        return `<div id='${element.id}' style="width: 28%; align-text: center; background-color: grey; margin: 2%; aspect-ratio: 1;">
                    <img src='${element.image}' style="width: 100%; margin: 0%; padding: 0%;">
                    <button class="skinButton" id='${element.id}-button' onclick="localStorage.setItem('selectedSkin-${category}','${element.id}');" style="margin-bottom: 0%;">
                        <div style="display: flex; flex-direction: row; flex-wrap: wrap;justify-content: space-between;">
                            <p style="color: black; width: 100%; font-size: small; text-align: center; margin: 0%;">${element.skinName}<br>$${element.price}</p>
                        </div>
                    </button>
                </div>`
    });
    // After all the cards have been created I join the array that contains them into a string with the HTML code to be used and I return it
    skinCards = skinCards.join('')
    return skinCards
}

export {getWeponCategoryButtons, getWeaponTypeButtonsByCategory, getSkinTypeButtonsByWeapon, toggleCategory}