import { getWeaponInfoById } from "./payloadDisplay.js"

const getMyAgentDisplay = () => {
    let divContainer = document.createElement('div')
    divContainer.id = 'agentDisplayContainer'
    
    // divContainer styling
    const divContainerStyle = {
        'display': 'flex',
        'flexDirection': 'row',
        'flexWrap': 'wrap',
        'justifyContent': 'center',
        'width': '80%',
        'marginInline': '10%',
    }
    for(const [key, val] of Object.entries(divContainerStyle)){
        divContainer.style[key] = val
    }
    
    let h1 = document.createElement('h1')
    h1.textContent = `${localStorage.getItem('myAgentCustomName')}`
    h1.style.width = '100%'
    h1.style.textAlign = 'center'
    divContainer.appendChild(h1)
    
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
    
    
    for(let i=0; i<categories.length; i++){        
        let image = document.createElement('img')
        const categoryObject = getWeaponInfoById(categories[i], currentPayload[categories[i]],weaponObject)
        image.src = categoryObject.image
        image.title = `Category: ${categories[i]}\nWeapon name: ${categoryObject.skinName.split('|')[0].trim()}\nSkin name: ${categoryObject.skinName.split('|')[1].trim()}\nPrice: $${categoryObject.price}\nRarity: ${categoryObject.rarity.split('_')[1]}`
        image.style.width = '40%'
        payloadCardsDiv.appendChild(image)
    }
    
    const agentImage = localStorage.getItem('myCharacterImage')
    let avatarImage = document.createElement('img')
    avatarImage.src = agentImage
    avatarImage.style.width = '50%'
    avatarImage.style.height = '50%'
    avatarImage.style.alignSelf = 'flex-end'
    avatarImage.style.margin = '0%'
    
    divContainer.appendChild(avatarImage)
    divContainer.appendChild(payloadCardsDiv)

    return divContainer
}

const myAgentDisplay = () => {
    const divContainer = getMyAgentDisplay()
    document.getElementById('agentDisplayDiv').appendChild(divContainer)
}

export {getMyAgentDisplay, myAgentDisplay}