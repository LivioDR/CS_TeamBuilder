/* Available languages */
// bg cs da de el en es-ES es-MX fi fr hu it ja ko nl no pl pt-BR pt-PT ro ru sv th tr uk zh-CN zh-TW vi
const language = 'en'
const baseUrl = `https://bymykel.github.io/CSGO-API/api/${language}`

const getAllAgents = async() => {
    try{
        let result = await fetch(`${baseUrl}/agents.json`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}
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

const getNameAndPictureByTeam = async(team) => {
    try{
        let teamAgents = await getAgentsByTeam(team)
        let namesAndPics = []
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

const getPicturesByTeam = async(team) => {
    try{
        let teamAgents = await getAgentsByTeam(team)
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

const getAgentById = async(id) => {
    try{
        let allAgents = await getAllAgents()
        let filteredResult = allAgents.filter(agent => agent.id == id)
        return filteredResult
    }
    catch(e){
        return e
    }
}


export {getAllAgents, getAgentsByTeam, getNameAndPictureByTeam, getPicturesByTeam, getAgentById}