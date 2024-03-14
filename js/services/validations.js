import errorMessages from "../utilities/errorMessages.js"
import { getPayloadCards } from "../components/payloadDisplay.js"

const stringLengthValidation = () => {
    const inputField = document.getElementById('agentsNameInput')
    const alertMessageParagraph = document.getElementById('nameAlert')
    const confirmationButton = document.getElementById('confirmAgentBtn')


    if(inputField.value.length > 20){
        alertMessageParagraph.innerText = errorMessages['tooLong']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true
    }
    else if(inputField.value.length == 0){
        alertMessageParagraph.innerText = errorMessages['noName']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true
    }
    else if(inputField.value.trim().split(" ").length > 2){
        alertMessageParagraph.innerText = errorMessages['tooManyWords']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true    
    }
    else{
        alertMessageParagraph.hidden = true
        confirmationButton.disabled = false
    }
}

const getFullEquipmentFromLocalStorage = () => {
    let equipment = {}
    const weaponsObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(weaponsObject)
    categories.splice(categories.indexOf('null'),1)
    for(let i=0; i<categories.length; i++){
        const localStorageString = `selectedSkin-${categories[i]}`
        equipment[categories[i]] = localStorage.getItem(localStorageString)
    }
    return equipment
}

const agentsPayloadValidation = () => {
    let fullEquipment = getFullEquipmentFromLocalStorage()
    localStorage.setItem('currentPayload',JSON.stringify(fullEquipment))
    // I create the equipment cards and add them to the UI to allow the user see their current equipment
    getPayloadCards()
    // I validate the balance and the number of equipped items to allow the user to move to next screen or not
    if(balanceValidation() && fullEquipmentValidation()){
        document.getElementById('confirmEquipBtn').hidden = false
    }
    else {
        document.getElementById('confirmEquipBtn').hidden = true
    }

}

const getAvailableBalance = () => {
    const initialCash = localStorage.getItem('initialCash')
    const currentBalance = (localStorage.getItem('currentBalance')|0)
    return initialCash - currentBalance
}

const balanceValidation = () => {
    let available = getAvailableBalance()
    if(available < 0){
        return false
    }
    else {
        return true
    }
}

const fullEquipmentValidation = () => {
    const currentPayload = JSON.parse(localStorage.getItem('currentPayload'))
    const weaponObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(currentPayload)
    let itemsEquipped = 0
    for(let i=0; i<categories.length; i++){        
        if(currentPayload[categories[i]] !== null){
            itemsEquipped++
        }
    }
    if(itemsEquipped == 6){
        return true
    }
    else {
        return false
    }
}

export {stringLengthValidation, agentsPayloadValidation, getAvailableBalance, balanceValidation, fullEquipmentValidation}