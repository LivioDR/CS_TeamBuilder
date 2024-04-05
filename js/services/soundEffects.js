// Plays a sound effect depending on the string as a parameter
const playSfx = async(sound) => {
    let soundFx;
    switch(sound){
        case 'okLetsGo':
        {
            soundFx = new Audio('./assets/audio/SFX/CSOkLetsGo.mp3')
            break;
        }
        case 'terrorists':
        {
            soundFx = new Audio('./assets/audio/SFX/tWins.mp3')
            break;
        }
        case 'counter-terrorists':
        {
            soundFx = new Audio('./assets/audio/SFX/ctWins.mp3')
            break;
        }
        case 'fireInTheHole':
        {
            soundFx = new Audio('./assets/audio/SFX/fireInTheHole.mp3')
            break;
        }
        case 'takingFire':
        {
            soundFx = new Audio('./assets/audio/SFX/takingFire.mp3')
            break;
        }
        case 'enemyDown':
        {
            soundFx = new Audio('./assets/audio/SFX/enemyDown.mp3')
            break;
        }
    }
    soundFx.play()
}

export default playSfx