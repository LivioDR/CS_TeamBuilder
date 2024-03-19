import { getUserFullNameAndUsername } from "./usernameApi.js"

const getAgentEquipmentByTeam = (team) => {
    const availableWeapons = team === localStorage.getItem('myTeam') ? JSON.parse(localStorage.getItem('weaponObject')) : JSON.parse(localStorage.getItem('enemyWeaponObject'))

    console.log(team)
    console.log(availableWeapons)

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
        myTeamPayout.push(getAgentEquipmentByTeam(myTeam))
    }
    for(let i=0; i<4; i++){
        enemyTeamPayout.push(getAgentEquipmentByTeam(enemyTeam))
    }


}

export default csAgentsBuilder