import { getWeaponInfoById } from "./payloadDisplay.js"

// This function returns an HTML with the name, avatar and payload of my agent to display it
// It doesn't receive any arguments as the information for my agent is managed differently from the information of the other team members and can be retrieved directly from the local storage
const getMyAgentDisplay = () => {
    // Creating the container to hold the HTML elements to be displayed
    let divContainer = document.createElement('div')
    divContainer.id = 'agentDisplayContainer'
    
    // divContainer styling
    const divContainerStyle = {
        'display': 'flex',
        'flexDirection': 'row',
        'flexWrap': 'wrap',
        'justifyContent': 'space-between',
        'width': '80%',
        'marginInline': '10%',
        'alignItems': 'center',
    }
    for(const [key, val] of Object.entries(divContainerStyle)){
        divContainer.style[key] = val
    }
    
    // Creating, styling and appending the header to hold my agent's name
    let h1 = document.createElement('h1')
    h1.innerHTML = `${localStorage.getItem('myAgentCustomName')}`
    h1.style.width = '70%'
    h1.style.textAlign = 'center'
    divContainer.appendChild(h1)

    // Adding the div element that will hold the remaining balance for my agent after purchasing the equipment
    let balanceSpan = document.createElement('div')
    balanceSpan.innerText = `(Balance: $${Number(localStorage.getItem('initialCash')) - Number(localStorage.getItem('currentBalance'))})`
    balanceSpan.className = 'balanceDiv'
    divContainer.appendChild(balanceSpan)
    
    // Getting the current payload information from the local storage to create the equipment display on the side of my character's avatar
    const currentPayload = JSON.parse(localStorage.getItem('currentPayload'))
    const weaponObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(currentPayload)
    let payloadCardsDiv = document.createElement('div')
    
    // payloadCardsDiv styling
    const payloadCardsStyle = {
        'display' : 'flex',
        'flexDirection' : 'row',
        'flexWrap' : 'wrap',
        'justifyContent' : 'space-around',
        'backgroundColor' : 'lightgrey',
        'width' : '50%',
    }
    for(const [key, val] of Object.entries(payloadCardsStyle)){
        payloadCardsDiv.style[key] = val
    }
    
    // After styling the container for my equipment I proceed to create the elements to be contained in it, along with the weapons information to be shown through the title HTML attribute whenever the user hovers on any weapon
    for(let i=0; i<categories.length; i++){        
        let image = document.createElement('img')
        const categoryObject = getWeaponInfoById(categories[i], currentPayload[categories[i]],weaponObject)
        image.src = categoryObject.image
        image.title = `Category: ${categories[i]}\nWeapon name: ${categoryObject.skinName.split('|')[0].trim()}\nSkin name: ${categoryObject.skinName.split('|')[1].trim()}\nPrice: $${categoryObject.price}\nRarity: ${categoryObject.rarity.split('_')[1]}`
        image.style.width = '40%'
        payloadCardsDiv.appendChild(image)
    }

    // Creating the object to be used to set the agent stats for the battle simulator
    const agentDetails = {
        name: localStorage.getItem('myAgentCustomName'),
        agentId: localStorage.getItem('myCharacterId'),
        image: localStorage.getItem('myCharacterImage'),
        weaponsArray: Object.values(JSON.parse(localStorage.getItem('currentPayload'))),
    }
    // All the data for my agent is done, I proceed to save the object on the local storage to retrieve it later
    localStorage.setItem('myBattlePayload',JSON.stringify(agentDetails))
    
    // Last, I create my avatar image element, set its path and styling before appending it along with the payload container to the main container to be returned
    const agentImage = localStorage.getItem('myCharacterImage')
    let avatarImage = document.createElement('img')
    avatarImage.src = agentImage
    avatarImage.style.maxWidth = '50%'
    avatarImage.style.alignSelf = 'flex-end'
    avatarImage.style.margin = '0%'
    avatarImage.style.maskImage = "linear-gradient(to bottom, black 90%,transparent 95%)"
    avatarImage.style.objectFit = 'contain'
    avatarImage.style.aspectRatio = '4/3'

    divContainer.appendChild(avatarImage)
    divContainer.appendChild(payloadCardsDiv)

    return divContainer
}

// I use this function to append my agent's display to the container on the screen that displays only my agent.
// This way I can keep the getMyAgentDisplay() function separatedly to use it again later when I need to get my character's display for the team display screen
const myAgentDisplay = () => {
    const divContainer = getMyAgentDisplay()
    document.getElementById('agentDisplayDiv').appendChild(divContainer)
}

export {getMyAgentDisplay, myAgentDisplay}