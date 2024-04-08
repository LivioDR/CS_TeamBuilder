const baseUrl = 'https://randomuser.me'
const availableCountries = [
    'AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US'
]

// I read first the navigator language to retrieve users that simulate being connected to the player's nearest server
const navigatorLanguage = navigator.language
// If the browser language is not among the supported languages, I pick US-English by default
let nat = availableCountries.includes(navigatorLanguage.split('-')[0].toUpperCase()) ? navigatorLanguage.split('-')[0].toUpperCase() : 'US'

// Returns an array of 7 users with their name and username to be used while creating my teammates and the users for the rival team
// Since I'll be requiring always only 7 users, I'm setting this on the API call instead of this number being an argument that the function migth receive
const getUserFullNameAndUsername = async() => {
    try{
        let result = await fetch(`${baseUrl}/api?results=7&nat=${nat}&inc=name,login`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}

export {getUserFullNameAndUsername}