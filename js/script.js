import { getAgentsByTeam, getNameAndPictureByTeam } from "./services/csgoApiAgents.js";
import { createAllCards} from "./components/cards.js";

// Audio configuration
const speakerIcon = document.getElementById('speakerIcon')
const toggleMusic = () => {
    const audioBar = document.getElementById('soundtrack');
    if(speakerIcon.className == 'fa-solid fa-volume-xmark'){
        speakerIcon.classList = "fa-solid fa-volume-high"
        audioBar.play()
    }
    else {
        speakerIcon.classList = 'fa-solid fa-volume-xmark'
        audioBar.pause()
    }
}
speakerIcon.addEventListener('click',toggleMusic)

// Function to change screen after clicking on start
const startBuilder = () => {
    document.getElementById('firstScreen').hidden = true
    document.getElementById('secondScreen').hidden = false
}
document.getElementById('startBtn').addEventListener('click', startBuilder)

let team = '' // string with the team id
let agentsInfoForSelection = [] // array to contain the agents of such team


// Adding event listeners to the buttons for the team selection
// Terrorists
document.getElementById('terroristBtn').addEventListener('click',() => {
    team = 'terrorists';
    // agentsInfoForSelection = await getNameAndPictureByTeam(team);
    selectAgentScreen();
})
// Counter-terrorists
document.getElementById('counterBtn').addEventListener('click',() => {
    team = 'counter-terrorists';
    // agentsInfoForSelection = await getNameAndPictureByTeam(team);
    selectAgentScreen();
})
// Random team
document.getElementById('autoTeamBtn').addEventListener('click',() => {
    team = Math.random() > 0.5 ? 'counter-terrorists' : 'terrorists';
    // agentsInfoForSelection = await getNameAndPictureByTeam(team);
    selectAgentScreen();
})


// Function to handle the team selection
const selectAgentScreen = async() => {
    agentsInfoForSelection = await getNameAndPictureByTeam(team)
    document.getElementById('secondScreen').hidden = true
    document.getElementById('thirdScreen').hidden = false
    assignTeamToHeader()
    let clickeableListOfAgents = createAllCards(agentsInfoForSelection)
    document.getElementById('listOfAgents').innerHTML = clickeableListOfAgents
}

// Function to add the team's name to the header on the agent selection screen
const assignTeamToHeader = () => {
    const chooseAgentH1 = document.getElementById('chooseAgentH1')
    chooseAgentH1.innerHTML = chooseAgentH1.innerHTML.replace('yourTeam', team.toUpperCase())
}