import { getAvailableBalance } from "../services/validations.js"

// This function calls the getAvailableBalance() function to manage the agent's balance display styling on my agent display screen. 
// This is being used only for my agent, since it's the only one that at any point in time can have a negative balance (even though, this won't allow the user to progress to the next screen until fixed)
const changeBalanceDisplay = () => {
    let balance = getAvailableBalance()
    const balanceH1 = document.getElementById('balanceH1')
    if(balance < 0){
        balanceH1.innerHTML = `Balance: <span style="color: red;">$${balance}</span>`
    }
    else{
        balanceH1.innerHTML = `Balance: $${balance}`
    }
}

// This function is used to get an specific weapon's information based on its ID and category. The returned object will be processed by other functions to create payload cards for such weapon
const getWeaponInfoById = (category, id, allWeapons) => {
    for(const [key, val] of Object.entries(allWeapons[category])){
        const filteredValues = val.filter(skin => skin.id === id)
        if(filteredValues.length > 0){
            return filteredValues[0]
        }
    }
    return 'not found'
}

// This function is in charge of creating the payload cards to be displayed beneath the weapon category buttons on the weapon selection screen
// It is executed through the validation functions every time a new weapon is selected by the user
const getPayloadCards = () => {
    const currentPayload = JSON.parse(localStorage.getItem('currentPayload'))
    const weaponObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(currentPayload)
    let currentBalance = 0
    
    let payloadCardsDiv = document.createElement('div')
    const payloadDivStyle = {
        'backgroundColor' : 'lightgrey',
        'width' : '100%',
        'display' : 'flex',
        'flexDirection' : 'row',
        'flexWrap' : 'wrap',
        'justifyContent' : 'space-between',
        'marginTop' : '10%',

    }
    for(const [key, val] of Object.entries(payloadDivStyle)){
        payloadCardsDiv.style[key] = val
    }

    // Creating the image containers for each category and appending them to the main container
    for(let i=0; i<categories.length; i++){        
        // Checking if the weapon was already selected by the user or not
        if(currentPayload[categories[i]] !== null){
            let image = document.createElement('img')
            const categoryObject = getWeaponInfoById(categories[i], currentPayload[categories[i]],weaponObject)
            image.src = categoryObject.image
            currentBalance += categoryObject.price
            image.title = `${categoryObject.skinName}\nPrice: $${categoryObject.price}`
            image.style.width = '40%'
            payloadCardsDiv.appendChild(image)
        }
        // If the user hasn't selected a weapon of this category yet, the else statemente will be executing creating an empty grey container instead
        else{
            let image = document.createElement('div')
            image.style.backgroundColor = 'grey'
            image.style.width = '40%'
            payloadCardsDiv.appendChild(image)
        }
    }
    // Once the container has been populated with all the selected weapons & empty spaces, I add it to beneath the category buttons
    const currentEquipmentDiv = document.getElementById('categoryDiv')
    if(currentEquipmentDiv.lastChild && !['Gloves', 'Heavy', 'Pistols', 'Rifles', 'Knives', 'SMGs'].includes(currentEquipmentDiv.lastChild.textContent.trim())){ // I check if there was already a previous container appended to remove it
        currentEquipmentDiv.lastChild.remove()
    }
    currentEquipmentDiv.appendChild(payloadCardsDiv)

    // Saving the new balance to the local storage to re-calculate the current balance
    localStorage.setItem('currentBalance',currentBalance)
    
    // I then change the balance display every time I select a new weapon
    changeBalanceDisplay()
}

export {changeBalanceDisplay, getPayloadCards, getWeaponInfoById}