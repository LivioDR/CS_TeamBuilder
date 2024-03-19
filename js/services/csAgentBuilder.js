import { getUserFullNameAndUsername } from "./usernameApi.js"

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


const csAgentsBuilder = async() => {
    // Function to create 3 agent cards for my team
    // and 4 agent cards for the enemy team
    // To return them in an array of HTMLContent strings
    
    // Get user names
    let agentsNames = await getUserFullNameAndUsername()
    console.log(agentsNames.results)
    
    // Get user payouts
    const myTeam = localStorage.getItem('myTeam')
    const enemyTeam = localStorage.getItem('enemyTeam')

    let myTeamPayout = []
    let enemyTeamPayout = []
    for(let i=0; i<3; i++){
        myTeamPayout.push({...getAgentEquipmentByTeam(myTeam), name: `${agentsNames.results[i].name.first} ${agentsNames.results[i].name.last}`})
    }
    for(let i=0; i<4; i++){
        enemyTeamPayout.push({...getAgentEquipmentByTeam(enemyTeam), name: `${agentsNames.results[i+3].name.first} ${agentsNames.results[i+3].name.last}`})
    }
    console.log(myTeamPayout)
    console.log(enemyTeamPayout)

    // return [myTeamPayout, enemyTeamPayout]
}

export default csAgentsBuilder