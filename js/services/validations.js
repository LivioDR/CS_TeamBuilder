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
    getPayloadCards()

}

export {stringLengthValidation, agentsPayloadValidation}