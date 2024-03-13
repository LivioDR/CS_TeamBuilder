import { getNameAndPictureByTeam } from "./services/csgoApiAgents.js";
import { createAllCards, toggleBackground} from "./components/cards.js";
import { stringLengthValidation } from "./services/validations.js";
import { getSkinByTeam, getSkinByTeamGroupedByCategoryAndWeapon } from "./services/csgoApiSkins.js";
import { getWeponCategoryButtons, getWeaponTypeButtonsByCategory, toggleCategory} from "./components/weaponSelectionButtons.js";

// Declaration of global variables
let team = '' // string with the team id
let agentsInfoForSelection = [] // array to contain the agents of such team
let weaponsForMyTeam = []
let enemyWeapons = []
const INITIAL_CASH = 9000   // the money that you have available in the beginning
let currentCash = INITIAL_CASH

// Clearing the local storage before starting the program
localStorage.clear()

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

}

// Function to handle the weapon selection screen
const selectWeaponScreen = async() => {
    // I store the custom name of the agent, in case that the user has changed it
    localStorage.setItem('myAgentCustomName', document.getElementById('agentsNameInput').value)

    // I retrieve all the weapons information for both teams and rearreange it on a custom object
    weaponsForMyTeam = await getSkinByTeamGroupedByCategoryAndWeapon(team)
    enemyWeapons = await getSkinByTeamGroupedByCategoryAndWeapon(team === 'terrorists' ? 'counter-terrorists' : 'terrorists')
    
    // adding the weapons passed by the object to the local storage
    localStorage.setItem('weaponObject',JSON.stringify(weaponsForMyTeam))
    localStorage.setItem('enemyWeaponObject',JSON.stringify(enemyWeapons))
    console.log(weaponsForMyTeam)
    console.log(enemyWeapons)
    
    // Hiding the third screen and showing the forth screen
    document.getElementById('thirdScreen').hidden = true
    document.getElementById('fourthScreen').hidden = false

    // Retrieving the category buttons and adding them to the HTML
    const categoryButtons = getWeponCategoryButtons(weaponsForMyTeam)
    document.getElementById('categoryDiv').innerHTML = categoryButtons[1]

    // Adding an event listener to the category buttons
    const allCategoryButtons = document.getElementsByTagName('button')
    for(let i=0; i<allCategoryButtons.length; i++){
        if(allCategoryButtons[i].id.endsWith('-category')){
            allCategoryButtons[i].addEventListener('click',toggleCategory)
        }
    }
        
}

// Assignning the function to move from 3->4 screen to the continue button
document.getElementById('confirmAgentBtn').addEventListener('click',selectWeaponScreen)