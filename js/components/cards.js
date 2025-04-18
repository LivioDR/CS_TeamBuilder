import { stringLengthValidation } from "../services/validations.js"

// A function to handle the change of background color whenever the user selects an agent
const toggleBackground = () => {
    const arrayOfCards = document.getElementsByTagName('div')
    for(let i=0; i<arrayOfCards.length; i++){
        if(arrayOfCards[i].id.endsWith('-div')){
            arrayOfCards[i].style.backgroundColor = 'white'
            if(arrayOfCards[i].id === `${localStorage.getItem('myCharacterId')}-div`){
                arrayOfCards[i].style.backgroundColor = 'lightblue'
            }
        }
    }
    // I run the string validation for the name in case that a default name is not compliant with the set rules
    stringLengthValidation()
}

// This function receives an object with an agent's information and creates a card out of it to append it to the agent selection screen
const createCardFromObject = (obj) => {
    let formattedName = obj.name.replaceAll("'","´")
    return `<div style="width: 20%; margin: 2%; aspect-ratio: 1; color: black; display: flex; flex-direction: column; justify-content: flex-end;" id='${obj.id}-div'>
    <img src=${obj.image} style="width: 80%; margin-inline: 10%; align-content: center;">
    <button id=${obj.id} style="font-size: x-small; height: 3em; width: 100%; margin: 0%;" onclick="localStorage.setItem('myCharacterId','${obj.id}');localStorage.setItem('myCharacterImage','${obj.image}');document.getElementById('agentsNameInput').value = '${formattedName.substr(0,20)}';">
    ${obj.name}
    </button>
    </div>`
}

// This function receives an array with the information from all agents of a faction and calls the createCardFromObject() function to create a card for each one of them. After creating all the cards, this function appends them to a container div and returns it as a string to be included on the innerHTML of the main container
const createAllCards = (arr) => {
    let stringOfCards = ''
    for(let i=0; i<arr.length; i++){
        stringOfCards += createCardFromObject(arr[i])
    }
    return `<div style="display: flex; flex-direction: row; flex-wrap: wrap; background-color: white; margin: 2%; overflow-y: auto; aspect-ratio: 1; justify-content: space-around;">${stringOfCards}</div>`
}

export {toggleBackground, createAllCards, createCardFromObject}