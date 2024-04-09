import errorMessages from "../utilities/errorMessages.js"
import { getPayloadCards } from "../components/payloadDisplay.js"

// This function will verify that an agent was selected by checking if an agents ID was stored in the local storage, returning true or false accordingly
const agentSelectedValidation = () => {
    // Retrieve the value of the ID from the local storage
    const agentId = localStorage.getItem('myCharacterId')
    // Then I get the paragraph element that I'm using as an alert message to show it or hide it depending on the presence of an agent ID on the local storage
    const alertMessageParagraph = document.getElementById('nameAlert')


    if(agentId != undefined){
        // If there's an agent selected, I hide the error message element and return true for this validation function
        alertMessageParagraph.hidden = true
        return true
    }
    else{
        // If there's no agent selected, I show the error message and return false for this validation function
        alertMessageParagraph.innerText = errorMessages['noAgent']
        alertMessageParagraph.hidden = false
        return false
    }
}

// This function gets the input element, the error message container and the confirmation button and enables or no the last two based on the input value
const stringLengthValidation = () => {
    const inputField = document.getElementById('agentsNameInput')
    const alertMessageParagraph = document.getElementById('nameAlert')
    const confirmationButton = document.getElementById('confirmAgentBtn')

    // if the player's name is longer than 20 characters
    if(inputField.value.length > 20){
        alertMessageParagraph.innerText = errorMessages['tooLong']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true
    }
    // if the player's name is empty
    else if(inputField.value.length == 0){
        alertMessageParagraph.innerText = errorMessages['noName']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true
    }
    // if the player's name is made of three or more words
    else if(inputField.value.trim().split(" ").length > 2){
        alertMessageParagraph.innerText = errorMessages['tooManyWords']
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true    
    }
    // otherwise, if everything is correct
    else{
        alertMessageParagraph.hidden = true
        confirmationButton.disabled = false
    }
}

/* Similar to stringLengthValidation, this function verifies that the team name follows the set rules:
 * - It is not empty
 * - It is a single word
 * - It does not contain any symbols or numbers
 * - Its lenght is 20 characters or less
 * If any of these conditions are not met, the confirmation button gets disabled and an error message is shown. 
 */
const teamNameValidation = () => {
    const inputField = document.getElementById('teamNameInput')
    const confirmButton = document.getElementById('createTeamButton')
    const alertMessageParagraph = document.getElementById('teamAlert')

    if(inputField.value.length == 0){
        alertMessageParagraph.innerText = errorMessages['noTeamName']
        alertMessageParagraph.hidden = false
        confirmButton.disabled = true
    }
    else if(inputField.value.trim().split(" ").length > 1){
        alertMessageParagraph.innerText = errorMessages['singleWord']
        alertMessageParagraph.hidden = false
        confirmButton.disabled = true    
    }
    else if(/([^\w]|\d)/i.test(inputField.value.trim())){
        alertMessageParagraph.innerText = errorMessages['noSymbols']
        alertMessageParagraph.hidden = false
        confirmButton.disabled = true
    } 
    else if(inputField.value.length > 20){
        alertMessageParagraph.innerText = errorMessages['teamTooLong']
        alertMessageParagraph.hidden = false
        confirmButton.disabled = true    
    }
    else {
        alertMessageParagraph.hidden = true
        confirmButton.disabled = false
    }
}

// This function returns an object that will contain the selected equipment for your character
const getFullEquipmentFromLocalStorage = () => {
    let equipment = {}
    // Retrieves all the categories dynamically from the local storage
    const weaponsObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(weaponsObject)
    // Gets rid of the category named 'null' on the API
    categories.splice(categories.indexOf('null'),1)
    for(let i=0; i<categories.length; i++){
        // then for every other category I retrieve the selected skin
        const localStorageString = `selectedSkin-${categories[i]}`
        equipment[categories[i]] = localStorage.getItem(localStorageString)
    }
    return equipment
}

const agentsPayloadValidation = () => {
    let fullEquipment = getFullEquipmentFromLocalStorage()
    // Saving the current payload on the local storage to use it later throughout the whole application
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

// Returns the money left after purchasing the weapons that the user has selected
const getAvailableBalance = () => {
    const initialCash = localStorage.getItem('initialCash')
    const currentBalance = (localStorage.getItem('currentBalance')|0) // if there's no property 'currentBalance' on the local sotrage yet, its value is currently zero
    return initialCash - currentBalance
}

// Verifies that the remaining balance is positive
const balanceValidation = () => {
    let available = getAvailableBalance()
    if(available < 0){
        return false
    }
    else {
        return true
    }
}

// Verifies that at least one weapon has been selected from each category and returns a boolean value based on that
const fullEquipmentValidation = () => {
    // Gets the current payload saved on the local storage by the agentsPayloadValidation() function
    const currentPayload = JSON.parse(localStorage.getItem('currentPayload'))
    // Then I get all the category names
    const weaponObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(currentPayload)
    let itemsEquipped = 0 // and I start counting the number of equipped weapons
    for(let i=0; i<categories.length; i++){        
        if(currentPayload[categories[i]] !== null){ // ...as long as the category is not 'null'
            itemsEquipped++
        }
    }
    if(itemsEquipped == 6){ // if I got all 6 weapons selected, this validation passes
        return true
    }
    else {
        return false
    }
}

export {agentSelectedValidation, stringLengthValidation, teamNameValidation, agentsPayloadValidation, getAvailableBalance, balanceValidation, fullEquipmentValidation}