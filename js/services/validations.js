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

export {stringLengthValidation}