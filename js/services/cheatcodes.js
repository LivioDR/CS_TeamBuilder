const customPortraits = {
    // Smash Bros skins - https://kuroganehammer.com/Smash4
    // Page currently under maintenance
    // 'pewpewpew': ['https://kuroganehammer.com/images/smash4/character/character-rockman.png','Megaman'],
    // 'chomp chomp': ['https://kuroganehammer.com/images/smash4/character/character-pac-man.png','Pac-Man'],
    // 'final fantasy': ['https://kuroganehammer.com/images/smash4/character/character-cloud.png','Cloud Strife'],
    // 'hyrule warrior': ['https://kuroganehammer.com/images/smash4/character/character-link.png', 'Link'],
    // 'sonic speed': ['https://kuroganehammer.com/images/smash4/character/character-sonic.png', 'Sonic'],
    // 'bounty hunter': ['https://kuroganehammer.com/images/smash4/character/character-samus.png', 'Samus Aran'],
    // 'italian plumber': ['https://kuroganehammer.com/images/smash4/character/character-mario.png', 'Mario'],
    // 'monkey business': ['https://kuroganehammer.com/images/smash4/character/character-donkey_kong.png','Donkey Kong'],
    // 'ohip': ['https://kuroganehammer.com/images/smash4/character/character-dr_mario.png','Dr. Mario'],
    // Fortnite skins - https://fortnite.fandom.com/wiki/Outfits
    'dark force': ['https://static.wikia.nocookie.net/fortnite/images/9/95/Darth_Vader_-_Outfit_-_Fortnite.png','Darth Vader'],
    'lh44blessed': ['https://static.wikia.nocookie.net/fortnite/images/b/b1/Lewis_Hamilton_-_Outfit_-_Fortnite.png','Lewis Hamilton'],
    'toriyama': ['https://static.wikia.nocookie.net/fortnite/images/3/3e/Son_Goku_-_Outfit_-_Fortnite.png', 'Goku'],
    'stan lee': ['https://static.wikia.nocookie.net/fortnite/images/c/c5/Spider-Man_-_Outfit_-_Fortnite.png', 'Peter Parker'],
    'the witcher': ['https://static.wikia.nocookie.net/fortnite/images/9/96/Geralt_of_Rivia_-_Outfit_-_Fortnite.png', 'Geralt'],
    'family guy': ['https://static.wikia.nocookie.net/fortnite/images/7/7c/Peter_Griffin_-_Outfit_-_Fortnite.png', 'Peter Griffin'],
    'metal gear': ['https://static.wikia.nocookie.net/fortnite/images/1/1b/Solid_Snake_-_Outfit_-_Fortnite.png', 'Solid Snake'],
    'ripandtear': ['https://static.wikia.nocookie.net/fortnite/images/f/f2/Doom_Slayer_-_Outfit_-_Fortnite.png', 'Doom Slayer'],
    'thelastcrusade': ['https://static.wikia.nocookie.net/fortnite/images/0/06/Indiana_Jones_-_Outfit_-_Fortnite.png', 'Indiana Jones'],
    'tomb raider': ['https://static.wikia.nocookie.net/fortnite/images/7/71/Lara_Croft_-_Outfit_-_Fortnite.png', 'Lara Croft'],
}
const moneyCheats = {
    'klapaucius': 2,
    'showmethemoney': 10,
    'povertyfinance': 0.5,
}

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

const isCheatCodeEnabled = () => {
    const enteredName = localStorage.getItem('myAgentCustomName').toLowerCase()

    if(customPortraits.hasOwnProperty(enteredName)){
        localStorage.setItem('myCharacterImage',customPortraits[enteredName][0])
        const newName = customPortraits[enteredName][1]
        document.getElementById('agentsNameInput').value = newName
        localStorage.setItem('myAgentCustomName',newName)
        return true
    }
    if(moneyCheats.hasOwnProperty(enteredName)){
        let currentCash = Number(localStorage.getItem('initialCash'))
        localStorage.setItem('initialCash',currentCash * moneyCheats[enteredName])
        return true
    }
    if(devHelps.hasOwnProperty(enteredName)){
        for(const [key, val] of Object.entries(devHelps[enteredName])){
            localStorage.setItem(key, val)
        }
        return true
    }
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

    return false
}

export default isCheatCodeEnabled