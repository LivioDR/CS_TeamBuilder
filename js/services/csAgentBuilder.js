import { getPicturesByTeam } from "./csgoApiAgents.js"
import { getUserFullNameAndUsername } from "./usernameApi.js"

// This function returns a random weapon from the object passed, based on the category passed as an argument
const getRandomWeaponByCategory = (weaponsObj, category) => {
    let availableWeapons = weaponsObj[category]
    const key = Object.keys(availableWeapons)
    key.splice(key.indexOf('availableRarities'),1)
    // I randomize first the weapon that I pick from the category
    let randomIndex = Math.floor(Math.random() * key.length)
    let choosedWeapon = weaponsObj[category][key[randomIndex]]
    // Then I randomize the skin for that weapon
    randomIndex = Math.floor(Math.random() * choosedWeapon.length)
    return choosedWeapon[randomIndex]
}

// Function to get the full equipment for an agent, based on the team passed as an argument
const getAgentEquipmentByTeam = (team) => {
    const availableWeapons = team === localStorage.getItem('myTeam') ? JSON.parse(localStorage.getItem('weaponObject')) : JSON.parse(localStorage.getItem('enemyWeaponObject'))
    let payload = {}
    let canAffordIt = false
    do{
        let currentCost = 0
        for(const [key, val] of Object.entries(availableWeapons)){
            payload[key] = getRandomWeaponByCategory(availableWeapons,key)
            currentCost += payload[key].price
        }
        // Validation of the cost of the equipment for this team member before returning the result
        if(Number(localStorage.getItem('initialCash')) >= currentCost){
            canAffordIt = true
        }
        else {
            currentCost = 0
        }
    }
    while(!canAffordIt)
    return payload
}

// Function to return a set number of agents images by team
const getAgentsPicsByTeam = async(team, number) => {
    let arrayOfPics = await getPicturesByTeam(team)
    let arrayToReturn = []
    while(arrayToReturn.length < number){
        let index = Math.floor(Math.random() * arrayOfPics.length)
        arrayToReturn.push(arrayOfPics[index])
        arrayOfPics.splice(index,1)
    }
    return arrayToReturn
}

// Function to create an HTML element based on the name and skins received
// EDITING HERE
const getAgentDisplay = (params) => {
    console.log('params')
    console.log(params)

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
    h1.textContent = `${params.name}`
    h1.style.width = '100%'
    h1.style.textAlign = 'center'
    divContainer.appendChild(h1)
    
    let categories = Object.keys(params)
    categories.splice(categories.indexOf('null'),1)
    categories.splice(categories.indexOf('name'),1)
    categories.splice(categories.indexOf('image'),1)
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
        const categoryObject = params[categories[i]]
        image.src = categoryObject.image
        image.title = `Category: ${categories[i]}\nWeapon name: ${categoryObject.skinName.includes('|') ? categoryObject.skinName.split('|')[0].trim() : categoryObject.skinName}\nSkin name: ${categoryObject.skinName.includes('|') ? categoryObject.skinName.split('|')[1].trim() : categoryObject.skinName}\nPrice: $${categoryObject.price}\nRarity: ${categoryObject.rarity.split('_')[1]}`
        image.style.width = '40%'
        payloadCardsDiv.appendChild(image)
    }
    
    const agentImage = params.image
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

// Function to create 3 agent cards for my team
// and 4 agent cards for the enemy team
// To return them in an array of HTMLContent elements
const csAgentsBuilder = async() => {
    // Get user names
    let agentsNames = await getUserFullNameAndUsername()
    
    // Get user payouts
    const myTeam = localStorage.getItem('myTeam')
    const enemyTeam = localStorage.getItem('enemyTeam')

    // Get avatars
    const myTeamPics = await getAgentsPicsByTeam(myTeam, 3)
    const enemyTeamPics = await getAgentsPicsByTeam(enemyTeam, 4)

    let myTeamPayout = []
    let enemyTeamPayout = []
    for(let i=0; i<3; i++){
        myTeamPayout.push({
            ...getAgentEquipmentByTeam(myTeam), 
            name: `${agentsNames.results[i].name.first} ${agentsNames.results[i].name.last}`,
            image: myTeamPics[i],})
    }
    for(let i=0; i<4; i++){
        enemyTeamPayout.push({
            ...getAgentEquipmentByTeam(enemyTeam), 
            name: `${agentsNames.results[i+3].name.first} ${agentsNames.results[i+3].name.last}`,
            image: enemyTeamPics[i],})
    }

    let myTeamHtmlElements = []
    let enemyTeamHtmlElements = []

    for(let i=0; i<myTeamPayout.length; i++){
        myTeamHtmlElements.push(getAgentDisplay(myTeamPayout[i]))
    }
    for(let i=0; i<enemyTeamPayout.length; i++){
        enemyTeamHtmlElements.push(getAgentDisplay(enemyTeamPayout[i]))
    }

    return [myTeamHtmlElements, enemyTeamHtmlElements]
}

export default csAgentsBuilder