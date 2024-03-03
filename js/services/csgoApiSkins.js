/* Available languages */
// bg cs da de el en es-ES es-MX fi fr hu it ja ko nl no pl pt-BR pt-PT ro ru sv th tr uk zh-CN zh-TW vi
const language = 'en'
const baseUrl = `https://bymykel.github.io/CSGO-API/api/${language}`

const getAllSkins = async() => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        return result
    }
    catch(e){
        return e
    }
}

const getSkinsByRarity = async(rarity) => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        let filteredResult = result.filter(item => item.rarity.id == rarity)
        return filteredResult
    }
    catch(e){
        return e
    }
}

const getSkinImageById = async(id) => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        let filteredResult = result.filter(item => item.id == id)
        return filteredResult
    }
    catch(e){
        return e
    }
}

const getSkinByWeaponName = async(weaponName) => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        let filteredResult = result.filter(item => item.weapon.name == weaponName)
        return filteredResult
    }
    catch(e){
        return e
    }
}


export {getAllSkins, getSkinsByRarity, getSkinImageById, getSkinByWeaponName}