const stringLengthValidation = () => {
    const inputField = document.getElementById('agentsNameInput')
    const alertMessageParagraph = document.getElementById('charLengthAlert')
    const emptyAlertParagraph = document.getElementById('emptyInputAlert')
    const confirmationButton = document.getElementById('confirmAgentBtn')


    if(inputField.value.length > 20){
        alertMessageParagraph.hidden = false
        confirmationButton.disabled = true
    }
    else if(inputField.value.length == 0){
        emptyAlertParagraph.hidden = false
        confirmationButton.disabled = true
    }
    else{
        emptyAlertParagraph.hidden = true
        alertMessageParagraph.hidden = true
        confirmationButton.disabled = false
    }
}

export {stringLengthValidation}