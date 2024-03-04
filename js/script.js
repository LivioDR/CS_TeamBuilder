import { getNameAndPictureByTeam } from "./services/csgoApiAgents.js";
import { createAllCards, toggleBackground} from "./components/cards.js";
import { stringLengthValidation } from "./services/validations.js";
import { getSkinByTeam, getSkinByTeamGroupedByCategoryAndWeapon } from "./services/csgoApiSkins.js";

// Declaration of global variables
let team = '' // string with the team id
let agentsInfoForSelection = [] // array to contain the agents of such team
let weaponsForMyTeam = []
let enemyWeapons = []
const INITIAL_CASH = 9000   // the money that you have available in the beginning
let currentCash = INITIAL_CASH

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



// Adding event listeners to the buttons for the team selection
// Terrorists
document.getElementById('terroristBtn').addEventListener('click',() => {
    team = 'terrorists';
    selectAgentScreen();
})
// Counter-terrorists
document.getElementById('counterBtn').addEventListener('click',() => {
    team = 'counter-terrorists';
    selectAgentScreen();
})
// Random team
document.getElementById('autoTeamBtn').addEventListener('click',() => {
    team = Math.random() > 0.5 ? 'counter-terrorists' : 'terrorists';
    selectAgentScreen();
})

// Function to add the team's name to the header on the agent selection screen
const assignTeamToHeader = () => {
    const chooseAgentH1 = document.getElementById('chooseAgentH1')
    chooseAgentH1.innerHTML = chooseAgentH1.innerHTML.replace('yourTeam', team.toUpperCase())
}

// Function to handle the team selection screen
const selectAgentScreen = async() => {
    // I retrieve the info of the available agents
    agentsInfoForSelection = await getNameAndPictureByTeam(team)

    
    // Change of screen
    document.getElementById('secondScreen').hidden = true
    document.getElementById('thirdScreen').hidden = false
    assignTeamToHeader()
    let clickeableListOfAgents = createAllCards(agentsInfoForSelection) // creating the card elements to display inside the agents div
    document.getElementById('listOfAgents').innerHTML = clickeableListOfAgents  // adding the cards to the div
    
    // Adding the change of background color on selection function to each agent's button
    const idRegex = /^agent-\d{3,6}$/
    const arrayOfButtons = document.getElementsByTagName('button')
    for(let i=0; i<arrayOfButtons.length; i++){
        if(idRegex.test(arrayOfButtons[i].id)){
            arrayOfButtons[i].addEventListener('click',toggleBackground)
        }
    }
    
    // Adding the validation for the name input field
    document.getElementById('agentsNameInput').addEventListener('keyup',stringLengthValidation)
    
    // Weapons test, to be deleted
    weaponsForMyTeam = await getSkinByTeamGroupedByCategoryAndWeapon(team)
    enemyWeapons = await getSkinByTeamGroupedByCategoryAndWeapon(team === 'terrorists' ? 'counter-terrorists' : 'terrorists')
    console.log(weaponsForMyTeam)
    console.log(enemyWeapons)
}
