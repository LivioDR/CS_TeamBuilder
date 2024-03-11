import errorMessages from "../utilities/errorMessages.js"

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
    const categories = ['Pistols', 'Rifles', 'Heavy', 'SMGs', 'Knives', 'Gloves']   // hardcoded categories, to be replaced by API fetched ones
    for(let i=0; i<categories.length; i++){
        const localStorageString = `selectedSkin-${categories[i]}`
        equipment[categories[i]] = localStorage.getItem(localStorageString)
    }
    return equipment
}

const agentsPayloadValidation = () => {
    let fullEquipment = getFullEquipmentFromLocalStorage()
    console.log(fullEquipment)
    localStorage.setItem('currentPayload',JSON.stringify(fullEquipment))
}

export {stringLengthValidation, agentsPayloadValidation}