import { getAgentStats } from "../services/battleSim.js"

// Function to create the cards to be used on the battle simulator
// Receives an object with all the agent's information (id, image_url, name, weapons)
const createBattleCard = (obj) => {

    // getting all the required info from the object
    const name = obj.name
    const img = obj.image
    const stats = getAgentStats(obj) // getting the stats for the battle based out of the agent ID and weapons ID

    // saving the stats to use them througout the battle
    localStorage.setItem(`${obj.agentId}`,JSON.stringify(stats))

    // creating and styling the container for the card
    let container = document.createElement('div')
    container.style.borderRadius = '50px'
    container.style.backgroundColor = 'rgba(150, 150, 150, 0.7)'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.justifyContent = 'space-between'
    container.style.alignItems = 'center'

    // creating and styling the header with the agent's name
    let agentH1Name = document.createElement('h1')
    agentH1Name.innerText = name
    agentH1Name.style.color = 'black'
    agentH1Name.style.margin = '0 auto'
    agentH1Name.style.textAlign = 'center'

    // creating and styling the img element with the avatar picture
    let agentImg = document.createElement('img')
    agentImg.src = img
    agentImg.style.aspectRatio = '4/3'
    agentImg.style.objectFit = 'contain'
    agentImg.style.width = '80%'
    agentImg.id = `${obj.agentId}-img`

    // HP bar creation
    let bar = document.createElement('div')
    let fill = document.createElement('div')
    let label = document.createElement('p')
    let wrapper = document.createElement('div')
    
    // wrapper styling. This wrapper will contain the HP value and the bar that will display it graphically
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'column'
    wrapper.style.justifyContent = 'center'
    wrapper.style.alignItems = 'center'
    wrapper.style.width = '100%'
    
    // Setting the label that will display numerically the remaining HP v Max HP
    label.innerText = `${stats.hp} / ${stats.maxHp}`
    label.style.width = '100%'
    label.style.color = 'black'
    label.style.fontSize = '1em'
    label.style.textAlign = 'center'
    label.style.margin = '0%'
    label.id = `${obj.agentId}-label`
    
    // Health bar styling. The fill element will be contained inside the bar element and its width will show graphically the remaining HP of the agent
    bar.style.width = '90%'
    bar.style.backgroundColor = 'red'
    bar.style.height = '2em'
    fill.style.width = `${(stats.hp/stats.maxHp)*100}%`
    fill.style.height = '2em'
    fill.style.backgroundColor = 'green'
    fill.id = `${obj.agentId}-hpFill`
    
    // Appending all these elements to the wrapper
    wrapper.appendChild(label)
    wrapper.appendChild(bar)
    bar.appendChild(fill)

    // Creating an element to show the remaining stats on a table
    let tableContainer = document.createElement('div')
    tableContainer.innerHTML = `<table>
                                    <thead><tr><th>Atk</th><th>Def</th><th>Spd</th></tr></thead>
                                    <tbody><tr><td>${stats.atk}</td><td>${stats.def}</td><td>${stats.spd}</td></tr></tbody>
                                </table>` // table created with a template to make it more easy to see, since we do not need to interact with it later
    tableContainer.style.width = '100%'
    
    // adding everything to the main container
    container.appendChild(agentH1Name)
    container.appendChild(agentImg)
    container.appendChild(wrapper)
    container.appendChild(tableContainer)

    return container
}

export {createBattleCard}