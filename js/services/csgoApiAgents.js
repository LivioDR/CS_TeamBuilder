/* Available languages */
// bg cs da de el en es-ES es-MX fi fr hu it ja ko nl no pl pt-BR pt-PT ro ru sv th tr uk zh-CN zh-TW vi
const language = 'en' // I'm setting the language by default to english for the API
const baseUrl = `https://bymykel.github.io/CSGO-API/api/${language}`

// A function to retrieve all the agents and their data from the CS-GO API
const getAllAgents = async() => {
    try{
        let result = await fetch(`${baseUrl}/agents.json`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}

// This function will return only the agents and their data that match the team passed as an argument
const getAgentsByTeam = async(team) => {
    try{
        let result = await fetch(`${baseUrl}/agents.json`).then(res => res.json())
        let filteredResult = result.filter(agent => agent.team.id == team)
        return filteredResult
    }
    catch(e){
        return e
    }
}

// Returns an array of objects containing the name, image path and ID of the agents from the team passed as an argument to this function
const getNameAndPictureByTeam = async(team) => {
    try{
        let teamAgents = await getAgentsByTeam(team) // getting all the agents of this team first
        let namesAndPics = []
        // Then I create and populate an array only with the information that I need from every agent
        for(let i=0; i<teamAgents.length; i++){
            namesAndPics.push({
                name: teamAgents[i].name.split(" | ")[0], // gets the name without the faction/team name
                image: teamAgents[i].image,
                id: teamAgents[i].id,
            })
        }
        return namesAndPics
    }
    catch(e){
        return e
    }
}

// Returns an array with the image path and the ID for every agent of the team received as an argument
const getPicturesByTeam = async(team) => {
    try{
        let teamAgents = await getAgentsByTeam(team) // getting all the agents of this team first
        let pics = []
        for(let i=0; i<teamAgents.length; i++){
            pics.push([teamAgents[i].image, teamAgents[i].id])
        }
        return pics
    }
    catch(e){
        return e
    }
}

export {getNameAndPictureByTeam, getPicturesByTeam}