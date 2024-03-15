const customPortraits = {
    'pewpewpew': 'https://kuroganehammer.com/images/smash4/character/character-rockman.png',
    'chomp chomp': 'https://kuroganehammer.com/images/smash4/character/character-pac-man.png',
    'final fantasy': 'https://kuroganehammer.com/images/smash4/character/character-cloud.png',
    'hyrule warrior': 'https://kuroganehammer.com/images/smash4/character/character-link.png',
    'sonic speed': 'https://kuroganehammer.com/images/smash4/character/character-sonic.png',
    'bounty hunter': 'https://kuroganehammer.com/images/smash4/character/character-samus.png',
    'italian plumber': 'https://kuroganehammer.com/images/smash4/character/character-mario.png',
    'monkey business': 'https://kuroganehammer.com/images/smash4/character/character-donkey_kong.png',
    'fatality': 'https://i.pinimg.com/474x/d0/29/cf/d029cf17be810ba33384948ec4211f2c.jpg',
}
const moneyCheats = {
    'klapaucius': 2,
    'showmethemoney': 10,
    'povertyfinance': 0.5,
}

const isCheatCodeEnabled = () => {
    const enteredName = localStorage.getItem('myAgentCustomName').toLowerCase()

    if(customPortraits.hasOwnProperty(enteredName)){
        localStorage.setItem('myCharacterImage',customPortraits[enteredName])
        return true
    }
    if(moneyCheats.hasOwnProperty(enteredName)){
        let currentCash = Number(localStorage.getItem('initialCash'))
        localStorage.setItem('initialCash',currentCash * moneyCheats[enteredName])
        return true
    }
    return false
}

export default isCheatCodeEnabled