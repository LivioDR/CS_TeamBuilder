import { getNameAndPictureByTeam } from "./services/csgoApiAgents.js";
import { createAllCards, toggleBackground} from "./components/cards.js";
import { stringLengthValidation, teamNameValidation } from "./services/validations.js";
import { getSkinByTeamGroupedByCategoryAndWeapon } from "./services/csgoApiSkins.js";
import { getWeponCategoryButtons, toggleCategory} from "./components/weaponSelectionButtons.js";
import { changeBalanceDisplay } from "./components/payloadDisplay.js";
import { getMyAgentDisplay, myAgentDisplay } from "./components/myAgentDisplay.js";
import isCheatCodeEnabled from "./services/cheatcodes.js";
import csAgentsBuilder from "./services/csAgentBuilder.js";

// Clearing the local storage before starting the program
localStorage.clear()

// Declaration of global variables
let team = '' // string with the team id
let agentsInfoForSelection = [] // array to contain the agents of such team
let weaponsForMyTeam = []
let enemyWeapons = []
const INITIAL_CASH = 9000   // the money that you have available in the beginning
localStorage.setItem('initialCash',INITIAL_CASH)

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
    localStorage.setItem('myTeam',team)
    localStorage.setItem('enemyTeam', 'counter-terrorists')
    selectAgentScreen();
})
// Counter-terrorists
document.getElementById('counterBtn').addEventListener('click',() => {
    team = 'counter-terrorists';
    localStorage.setItem('myTeam',team)
    localStorage.setItem('enemyTeam', 'terrorists')
    selectAgentScreen();
})
// Random team
document.getElementById('autoTeamBtn').addEventListener('click',() => {
    team = Math.random() > 0.5 ? 'counter-terrorists' : 'terrorists';
    localStorage.setItem('myTeam',team)
    localStorage.setItem('enemyTeam',team === 'terrorists' ? 'counter-terrorists' : 'terrorists')
    selectAgentScreen();
})

// Function to add the team's name to the header on the agent selection screen
const assignTeamToHeader = () => {
    const chooseAgentH1 = document.getElementById('chooseAgentH1')
    chooseAgentH1.innerHTML = `Choose an agent<br>${team.toUpperCase()}`
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
    localStorage.setItem('myAgentCustomName', document.getElementById('agentsNameInput').value.trim())
    
    // I check for any cheat codes that the user may have entered. If the user enters a cheatcode I activate it, but don't move to the next screen to allow the user enter an actual agent name. If the entered name does not match a cheat code, I execute the rest of the script
    if(!isCheatCodeEnabled()){

        // I retrieve all the weapons information for both teams and rearreange it on custom objects
        weaponsForMyTeam = await getSkinByTeamGroupedByCategoryAndWeapon(team)
        enemyWeapons = await getSkinByTeamGroupedByCategoryAndWeapon(team === 'terrorists' ? 'counter-terrorists' : 'terrorists')
        
        // adding the weapons passed by the object to the local storage
        localStorage.setItem('weaponObject',JSON.stringify(weaponsForMyTeam))
        localStorage.setItem('enemyWeaponObject',JSON.stringify(enemyWeapons))
        
        // Showing the balance on the upper-right corner of the screen
        changeBalanceDisplay()
        
        // Hiding the third screen and showing the fourth screen
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
    else{
        const confirmButton = document.getElementById('confirmAgentBtn')
        confirmButton.style.backgroundColor = 'lightgreen'
        setTimeout(() => {
            confirmButton.style.backgroundColor = '#F0F0F0'
        }, 500);
    }

}

// Assignning the function to move from 3->4 screen to the continue button
document.getElementById('confirmAgentBtn').addEventListener('click',selectWeaponScreen)

// Function to handle the character overview screen
const characterOverviewScreen = () => {
    // I create the agent display screen with the info selected up to this point
    myAgentDisplay()

    // I assign a default name to the team to start with
    document.getElementById('teamNameInput').value = 'DefaultTeamName'

    // Setting the styles for the balance display
    const balance = document.querySelector('#fifthScreen .balanceDiv')
    balance.style.fontSize = '1.5em'

    // Hiding the fourth screen and showing the fifth screen
    document.getElementById('fourthScreen').hidden = true
    document.getElementById('fifthScreen').hidden = false

    // Adding the validation for the team name input field
    document.getElementById('teamNameInput').addEventListener('keyup',teamNameValidation)

}
// Assigning the function to move from 4->5 screen to the confirm button
document.getElementById('confirmEquipBtn').addEventListener('click',characterOverviewScreen)

const teamOverviewScreen = async() => {
    // Get the team name from the input
    const teamName = document.getElementById('teamNameInput').value.trim()
    // Showing the team name on the h1 element of the screen
    document.getElementById('teamName').innerHTML = teamName

    // Get the HTML elements for my agent, my team, and the enemies
    const myAgent = getMyAgentDisplay()
    const [myTeammates, enemyTeam] = await csAgentsBuilder()

    // Adding these elements to the screen to show
    const teamDisplayContainer = document.getElementById('teamDisplay')
    myAgent.style.marginInline = '0%' // changing this value to adjust the display to the new screen
    teamDisplayContainer.appendChild(myAgent)
    teamDisplayContainer.append(...myTeammates)

    const enemyTeamDisplayContainer = document.getElementById('enemyTeamDisplay')
    enemyTeamDisplayContainer.append(...enemyTeam)

    // Giving specific styling to these containers
    let myTeamContainersArray = document.querySelectorAll("#teamDisplay div")
    for(const div of myTeamContainersArray){
        div.style.width = '40%'
        div.style.height = '40%'
    }
    let enemyTeamContainersArray = document.querySelectorAll("#enemyTeamDisplay div")
    for(const div of enemyTeamContainersArray){
        div.style.width = '40%'
        div.style.height = '40%'
    }
    let balanceDivs = document.querySelectorAll('.balanceDiv')
    for(const div of balanceDivs){
        div.style.width = '30%'
        div.style.fontSize = '0.8em'
    }
    // Hiding the fifth screen and showing the sixth screen
    document.getElementById('fifthScreen').hidden = true
    document.getElementById('sixthScreen').hidden = false
    
}
// Assigning the function to move from 5->6 screen to the create team button
document.getElementById('createTeamButton').addEventListener('click',teamOverviewScreen)

// Definition of the team display toggle function
const toggleTeamDisplay = () => {
    const toggleButton = document.getElementById('toggleTeamDisplayButton')
    const toggleEnemyButton = document.getElementById('toggleEnemyTeamDisplayButton')
    
    if(toggleButton.innerText.trim() === 'Display enemy team'){
        document.getElementsByClassName('flip-screen-container')[0].style.transform = 'rotateY(180deg)'
        toggleButton.innerText = 'Display my team'
        toggleEnemyButton.innerHTML = 'Display my team'
    }
    else{
        document.getElementsByClassName('flip-screen-container')[0].style.transform = 'rotateY(0deg)'
        toggleButton.innerText = 'Display enemy team'
        toggleEnemyButton.innerText = 'Display enemy team'
    }
}

// Adding the flip-screen function to the display team button
document.getElementById('toggleTeamDisplayButton').addEventListener('click',toggleTeamDisplay)
document.getElementById('toggleEnemyTeamDisplayButton').addEventListener('click',toggleTeamDisplay)
