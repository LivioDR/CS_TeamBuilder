const customPortraitsFolder = './assets/images/custom_portraits'

const customPortraits = {
    // Super Smash Bros skins - https://www.spriters-resource.com/nintendo_switch/supersmashbrosultimate/
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
    
    // Fortnite skins - https://fortnite.fandom.com/wiki/Outfits
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