import { getAgentStats } from "../services/battleSimStats.js"

// Function to create the cards to be used on the battle simulator
const createBattleCard = (obj) => {

    // getting all the required info from the object
    const name = obj.name
    const img = obj.image
    const stats = getAgentStats(obj)

    // creating the container for the card
    let container = document.createElement('div')
    container.style.borderRadius = '50px'
    container.style.backgroundColor = 'lightgray'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.justifyContent = 'space-between'
    container.style.alignItems = 'center'

    let agentH1Name = document.createElement('h1')
    agentH1Name.innerText = name
    agentH1Name.style.color = 'black'
    agentH1Name.style.margin = '0 auto'

    let agentImg = document.createElement('img')
    agentImg.src = img
    agentImg.style.aspectRatio = '4/3'
    agentImg.style.objectFit = 'contain'
    agentImg.style.width = '100%'

    // HP bar creation
    let bar = document.createElement('div')
    let fill = document.createElement('div')
    let label = document.createElement('p')
    let wrapper = document.createElement('div')
    
    // wrapper styling
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'row'
    wrapper.style.justifyContent = 'center'
    wrapper.style.alignItems = 'center'
    wrapper.style.width = '100%'
    
    // Remaining HP v Max HP
    label.innerText = `${stats.hp} / ${stats.maxHp}`
    label.style.width = '40%'
    label.style.color = 'black'
    label.style.fontSize = '1em'
    
    // Health bar styling
    bar.style.width = '55%'
    bar.style.backgroundColor = 'red'
    bar.style.height = '2em'
    fill.style.width = `${(stats.hp/stats.maxHp)*100}%`
    fill.style.height = '2em'
    fill.style.backgroundColor = 'green'
    
    wrapper.appendChild(label)
    wrapper.appendChild(bar)
    bar.appendChild(fill)

    // Remaining stats container
    let tableContainer = document.createElement('div')
    tableContainer.innerHTML = `<table style="color: black;">
                                    <thead><tr><th>Atk</th><th>Def</th><th>Spd</th></tr></thead>
                                    <tbody><tr><td>${stats.atk}</td><td>${stats.def}</td><td>${stats.spd}</td></tr></tbody>
                                </table>`
    
    // adding everything to the main container
    container.appendChild(agentH1Name)
    container.appendChild(agentImg)
    container.appendChild(wrapper)
    container.appendChild(tableContainer)

    return container
}

export {createBattleCard}