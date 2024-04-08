import MAPS_ARRAY from "../utilities/mapsArray.js"
import playSfx from "./soundEffects.js"

// Receives an object with the agent ID, and an array with the ID of every selected weapon to create the stats for the battle with them
// Object structure:
// agentObject = {
//     agentId: 'skin-1234',
//     weaponsArray: ['skin-123456', ...],
// }
const getAgentStats = (agentObject) => {
    const agentId = agentObject.agentId.split("-")[1]
    const [hp, speed] = [Math.round(Number(agentId)*((Math.random()*0.5)+1)), 100 + Number(agentId)%100]
    let weaponArray = agentObject.weaponsArray.map(skinId => Number(skinId.split("-")[1]))
    
    // I check for NaN values since there are a small number of skin IDs that do not include numbers (i.e. 'skin-butterfly-knife' instead of 'skin-123456')
    for(let i=0; i<weaponArray.length; i++){
        if(isNaN(weaponArray[i])){
            weaponArray[i] = 0
        }
    }
    
    let weaponStats = 0
    weaponStats = weaponArray.reduce((acc, val) => acc + val, 0)
    const [atk, def] = [Number(weaponStats.toString().substring(0,3)), (200 + Math.floor(Math.log(weaponStats%1000)*5))]
    const stats = {
        maxHp : hp,
        hp: hp,
        atk: atk,
        def: def,
        spd: speed,
    }
    return stats
}

// Receives an array of IDs and speed values to determine the turn order
// Array structure:
// [
//     [id, speed],
//     ...
// ]
const getTurnOrder = (arr) => {
    let turnOrder = arr.sort((a, b) => { return b[1] - a[1] }).map(ids => ids[0])
    return turnOrder
}

// Calculation of the damage done by one agent after subtracting the defense of the other agent. If the damage is less than 50, I set the damage as 50 by default
const calculateDamage = (atk, def) => {
    let accuracy = Math.random() + 0.5 // have the chance to do 50% to 150% of damage depending on the accuracy result
    let damage = Math.floor(accuracy * (atk - def))
    return damage > 50 ? damage : 50
}

// Manage the health bar for an agent
// Receives the agent ID and the damage to suffer by that agent
const changeHp = (agent, damage) => {
    let stats = JSON.parse(localStorage.getItem(agent))
    stats.hp = stats.hp - damage < 0 ? 0 : stats.hp - damage

    // save the changes
    localStorage.setItem(agent,JSON.stringify(stats))

    // change the info on the UI
    let label = document.getElementById(`${agent}-label`)
    label.innerText = `${stats.hp} / ${stats.maxHp}`
    let fillBar = document.getElementById(`${agent}-hpFill`)
    fillBar.style.width = `${(stats.hp/stats.maxHp)*100}%`

    // deal with fallen agents
    if(stats.hp == 0){
        // Changing the UI
        let img = document.getElementById(`${agent}-img`)
        img.style.transition = '2s'
        img.style.filter = 'opacity(0.25)'

        // Same for the gif
        let gif = document.getElementById(`${agent}-gif`)
        gif.style.transition = '2s'
        gif.style.filter = 'opacity(0)'

        // Changing the data on local storage
        let myTeam = JSON.parse(localStorage.getItem('aliveOnMyTeam'))
        let enemyTeam = JSON.parse(localStorage.getItem('aliveOnEnemyTeam'))

        if(myTeam.includes(agent)){
            myTeam.splice(myTeam.indexOf(agent),1)
            if(myTeam.length == 3){
                playSfx('takingFire')
            }
            localStorage.setItem('aliveOnMyTeam',JSON.stringify(myTeam))
        }
        if(enemyTeam.includes(agent)){
            enemyTeam.splice(enemyTeam.indexOf(agent),1)
            if(enemyTeam.length + myTeam.length == 6){
                playSfx('fireInTheHole')
            }
            if(enemyTeam.length == 3){
                playSfx('enemyDown')
            }
            localStorage.setItem('aliveOnEnemyTeam',JSON.stringify(enemyTeam))
        }
    }
}

// Execute an attack from one agent to other
// Received the id of the agents involved in the fight
const attack = (attacker, defender) => {
    let atkStats = JSON.parse(localStorage.getItem(attacker))
    let defStats = JSON.parse(localStorage.getItem(defender))

    const damage = calculateDamage(atkStats.atk, defStats.def)

    changeHp(defender,damage)
}

// Selects a target from the opponent team by passing the attacker's ID, returning the defenders ID
const selectTarget = (attacker) => {
    let myTeam = JSON.parse(localStorage.getItem('aliveOnMyTeam'))
    if(myTeam.includes(attacker)){
        let enemyTeam = JSON.parse(localStorage.getItem('aliveOnEnemyTeam'))
        return enemyTeam[Math.floor(Math.random() * enemyTeam.length)]
    }
    else{
        return myTeam[Math.floor(Math.random() * myTeam.length)]
    }
}

// Gets the full list of alive agents and returns it as an array containing their IDs and speed stat to be used for the getTurnOrder function
const getAllAliveAgents = () => {
    let myTeam = JSON.parse(localStorage.getItem('aliveOnMyTeam'))
    let enemyTeam = JSON.parse(localStorage.getItem('aliveOnEnemyTeam'))

    let arrayToReturn = []

    for(let i=0; i<myTeam.length; i++){
        let spd = JSON.parse(localStorage.getItem(myTeam[i])).spd
        arrayToReturn.push([myTeam[i],spd])
    }
    for(let i=0; i<enemyTeam.length; i++){
        let spd = JSON.parse(localStorage.getItem(enemyTeam[i])).spd
        arrayToReturn.push([enemyTeam[i],spd])
    }

    return arrayToReturn
}

// Checks if the battle has been completed and plays a sound effect if so, based on the winning team
const isBattleCompleted = () => {
    let myTeam = JSON.parse(localStorage.getItem('aliveOnMyTeam'))
    let enemyTeam = JSON.parse(localStorage.getItem('aliveOnEnemyTeam'))

    let myTeamSide = localStorage.getItem('myTeam')
    let enemyTeamSide = myTeamSide == 'terrorists' ? 'counter-terrorists' : 'terrorists'

    if((myTeam.length == 0 && myTeamSide == 'terrorists') || (enemyTeam.length == 0 && enemyTeamSide == 'terrorists')){
        playSfx('counter-terrorists')
        return true
    }
    else if((myTeam.length == 0 && myTeamSide == 'counter-terrorists') || (enemyTeam.length == 0 && enemyTeamSide == 'counter-terrorists')){
        playSfx('terrorists')
        return true
    }
    else {
        return false
    }
}

// Select a random map from the list of available maps and sets it as a background for the battle simulator screen
const selectMap = () => {
    const mapContainer = document.getElementById('teamsContainer')
    mapContainer.style.backgroundImage = `url(${MAPS_ARRAY[Math.floor(Math.random() * MAPS_ARRAY.length)]}`
    mapContainer.style.backgroundSize = 'cover'
}

// Sets all the animations to be visible on the battlefield and assigns them an ID based on each team's agents to link them to every agent, so we can make the animations disappear or stop on demand by using the agent's ID
const startUpGifs = () => {
    const gifsContainer = document.querySelectorAll('.animations')
    for(let i=0; i<gifsContainer.length; i++){
        gifsContainer[i].style.display = 'flex'
    }
    const soldierGifs = document.querySelectorAll('.soldier')
    const allAgents = getAllAliveAgents().map(agent => agent[0])
    for(let i=0; i<soldierGifs.length; i++){
        soldierGifs[i].id = `${allAgents[i]}-gif`
    }
}

// After the batle is completed I'm changing the shooting soldier GIFs to an static image of them standing since the battle is now over
const stopAnimations = () => {
    const soldierGifs = document.querySelectorAll('.soldier')
    for(let i=0; i<soldierGifs.length; i++){
        soldierGifs[i].src = './assets/images/animations/stillGunner.gif'
    }
}

// This is the main function that will set up the map and the soldier GIFs and after that will go through a loop of turns that will contain all the attacks, breaking out of the loop only after all the agents on a team have their HP = 0
const executeBattle = async() => {
    // Adding the map to the background
    selectMap()
    
    // Setting up the animations
    startUpGifs()

    // Starting the battle on a loop that will break whenever a team has no more agents alive
    while(true){
        // I get all the agents that are still alive for the turn
        let arrayOfAliveAgents = getAllAliveAgents()
        // Then I get the turn order
        let turnOrder = getTurnOrder(arrayOfAliveAgents)
        for(let i=0; i<turnOrder.length; i++){
            // Handling the attacks on each turn
            let target = selectTarget(turnOrder[i]) // Selecting the target for the agent whose turn is to attack
            attack(turnOrder[i],target) // executing the attack from the attacker agent to the defender agent

            // Setting a timeout to get to see the attacks for each turn
            const timer = (ms) => {
                return new Promise(res => setTimeout(res, ms));
            }
            await timer(100)

            // I check if the battle was completed to not continue trying to attack and exit the otherwise infinite loop
            if(isBattleCompleted()){
                // If the battle was indeed completed, I stop the winning team animations
                stopAnimations()
                // Then at last, I exit the infinite loop and this function
                return
            }
        }
    }
}

export {getAgentStats, executeBattle}
