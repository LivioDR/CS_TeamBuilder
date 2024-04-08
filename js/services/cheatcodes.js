const customPortraitsFolder = './assets/images/custom_portraits'

// This object will hold the path to every custom avatar that will be available and the default name of that character as an array. The key to every array value is the cheatcode to be used to enable it 
const customPortraits = {
    // Super Smash Bros skins - Donwloaded from https://www.spriters-resource.com/nintendo_switch/supersmashbrosultimate/
    'umbra witch': [`${customPortraitsFolder}/bayonetta.png`, 'Bayonetta'],
    'final fantasy': [`${customPortraitsFolder}/cloud.png`,'Cloud Strife'],
    'ohip': [`${customPortraitsFolder}/drmario.png`,'Dr. Mario'],
    'squid ink': [`${customPortraitsFolder}/inkling.png`,'Inkling'],
    'stealyourheart': [`${customPortraitsFolder}/joker.png`,'Joker'],
    'peachespeaches': [`${customPortraitsFolder}/koopa.png`, 'Bowser'],
    'hyrule warrior': [`${customPortraitsFolder}/link.png`, 'Link'],
    'italian plumber': [`${customPortraitsFolder}/mario.png`, 'Mario'],
    'chomp chomp': [`${customPortraitsFolder}/pacman.png`,'Pac-Man'],
    'pikapika': [`${customPortraitsFolder}/pikachu.png`,'Pikachu'],
    'pewpewpew': [`${customPortraitsFolder}/rockman.png`,'Megaman'],
    'bounty hunter': [`${customPortraitsFolder}/samus.png`, 'Samus Aran'],
    'onewingedangel': [`${customPortraitsFolder}/sephiroth.png`,'Sephiroth'],
    'animal crossing': [`${customPortraitsFolder}/shizue.png`, 'Isabelle'],
    'metal gear': [`${customPortraitsFolder}/snake.png`, 'Solid Snake'],
    'sonic speed': [`${customPortraitsFolder}/sonic.png`, 'Sonic'],
    
    // Fortnite skins - Donwloaded from https://fortnite.fandom.com/wiki/Outfits
    'dark force': [`${customPortraitsFolder}/darth_vader.webp`,'Darth Vader'],
    'thisistheway': [`${customPortraitsFolder}/mandalorian.webp`, 'The Mandalorian'],
    'lh44blessed': [`${customPortraitsFolder}/lewis_hamilton.webp`,'Lewis Hamilton'],
    'fairy tale': [`${customPortraitsFolder}/red_riding_hood.webp`, 'RedRidingHood'],
    'mariah carey': [`${customPortraitsFolder}/santa_claus.webp`, 'Santa Claus'],
    'toriyama': [`${customPortraitsFolder}/son_goku.webp`, 'Son Goku'],
    'stan lee': [`${customPortraitsFolder}/spiderman.webp`, 'Peter Parker'],
    'spiderverse': [`${customPortraitsFolder}/spider_gwen.webp`, 'Gwen Stacy'],
    'avengersassemble': [`${customPortraitsFolder}/tony_stark.webp`, 'Tony Stark'],
    'the witcher': [`${customPortraitsFolder}/geralt_of_rivia.webp`, 'Geralt'],
    'ripandtear': [`${customPortraitsFolder}/doom_guy.webp`, 'Doom Slayer'],
    'thelastcrusade': [`${customPortraitsFolder}/indiana_jones.webp`, 'Indiana Jones'],
    'tomb raider': [`${customPortraitsFolder}/lara_croft.webp`, 'Lara Croft'],
}
// These cheats will allow the user to modify the balance that any agent will have available to purchase weapons on the application
const moneyCheats = {
    'klapaucius': 2,
    'showmethemoney': 10,
    'povertyfinance': 0.5,
}

// This cheatcode will work setting up a default payload to speed up the testing process
// Once entered, the user will still need to select at least one category, weapon, and skin for the validation function to be triggered and load the rest of the skins
const devHelps = {
    'defaultpayload' : {
        "selectedSkin-Pistols": "skin-132116",
        "selectedSkin-Rifles": "skin-590028",
        "selectedSkin-Heavy": "skin-1638780",
        "selectedSkin-SMGs": "skin-1245808",
        "selectedSkin-Knives": "skin-32768152",
        "selectedSkin-Gloves": "skin-329686228"
    },
}

// This function is to be called on the agent selection screen and verifies if a cheat code was entered on the input element. If so, it will activate that cheat code and return true so the application doesn't continue with that value and wait until the user enters another agent name that does not match a cheat code
const isCheatCodeEnabled = () => {
    // First, I change the casing on the entered value to lower case to match-case the keys on the cheat codes objects
    const enteredName = localStorage.getItem('myAgentCustomName').toLowerCase()

    // Checking if a custom avatar cheat code was entered
    if(customPortraits.hasOwnProperty(enteredName)){
        localStorage.setItem('myCharacterImage',customPortraits[enteredName][0])
        const newName = customPortraits[enteredName][1]
        document.getElementById('agentsNameInput').value = newName
        localStorage.setItem('myAgentCustomName',newName)
        return true
    }
    // Checking for money cheat codes
    if(moneyCheats.hasOwnProperty(enteredName)){
        let currentCash = Number(localStorage.getItem('initialCash'))
        localStorage.setItem('initialCash',currentCash * moneyCheats[enteredName])
        return true
    }
    // Checking for developer help codes entered
    if(devHelps.hasOwnProperty(enteredName)){
        for(const [key, val] of Object.entries(devHelps[enteredName])){
            localStorage.setItem(key, val)
        }
        return true
    }
    // Checking if the entered name enables the user to go to the web version of Counter-Strike and opens it on a new tab
    if(enteredName === 'iwannaplay4real'){
        let linkToGame = document.createElement('a')
        linkToGame.href = "https://play-cs.com/en/"
        linkToGame.target = "_blank"
        linkToGame.id = 'linkToGame'
        document.body.appendChild(linkToGame)
        linkToGame.click()
        document.body.removeChild(linkToGame)
        return true
    }

    // If no cheat code was entered, return false to allow the application move to the next screen
    return false
}

export default isCheatCodeEnabled