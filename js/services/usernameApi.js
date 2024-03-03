const baseUrl = 'https://randomuser.me'
const availableCountries = [
    'AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US'
]

// I read first the navigator language to retrieve a users that may be connected to the player's nearest server 
const navigatorLanguage = navigator.language
let nat = availableCountries.includes(navigatorLanguage.split('-')[0].toUpperCase()) ? navigatorLanguage.split('-')[0].toUpperCase() : 'US'


const getFullUserData = async() => {
    try{
        let result = await fetch(`${baseUrl}/api?nat=${nat}`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}

const getUserFullNameAndUsername = async() => {
    try{
        let result = await fetch(`${baseUrl}/api?results=7&nat=${nat}&inc=name,login`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}

export {getFullUserData, getUserFullNameAndUsername}