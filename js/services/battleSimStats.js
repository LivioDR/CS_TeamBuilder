// Receives an object with the agent ID, and an array with the ID of every selected weapon to create the stats for the battle with them
// Object structure:
// agentObject = {
//     agentId: 'skin-1234',
//     weaponsArray: ['skin-123456', ...],
// }
const getAgentStats = (agentObject) => {
    const agentId = agentObject.agentId.split("-")[1]
    const [hp, speed] = [Math.round(Number(agentId)*(Math.random()+0.5)), Number(agentId)%100]
    let weaponArray = agentObject.weaponsArray.map(skinId => Number(skinId.split("-")[1]))
    let weaponStats = 0
    weaponStats = weaponArray.reduce((acc, val) => acc + val, 0)
    const [atk, def] = [Number(weaponStats.toString().substring(0,3)), weaponStats%1000]
    const stats = {
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
    return atk - def > 50 ? atk-def : 50
}

export {getAgentStats, getTurnOrder, calculateDamage}
