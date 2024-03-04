import weaponPricing from "../utilities/weaponPricing.js"
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

const getSkinByTeam = async(team) => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        let filteredResult = result.filter(item => item.team.id === team || item.team.id === 'both')
        let summarizedWeaponData = []
        for(let i=0; i<filteredResult.length; i++){
            summarizedWeaponData.push({
                category: filteredResult[i].category.name,
                id: filteredResult[i].id,
                image: filteredResult[i].image,
                skinName: filteredResult[i].name,
                team: filteredResult[i].team.id,
                weaponName: filteredResult[i].weapon.name,
                rarity: filteredResult[i].rarity.id,
            })
        }
        return summarizedWeaponData
    }
    catch(e){
        return e
    }
}

const getSkinByTeamGroupedByCategoryAndWeapon = async(team) => {
    try{
        let result = await fetch(`${baseUrl}/skins.json`).then(res => res.json())
        let filteredResult = result.filter(item => (item.team.id === team || item.team.id === 'both'))
        let summarizedDataByWeapon = {}
        for(let i=0; i<filteredResult.length; i++){

            let weaponName = filteredResult[i].weapon.name
            let categoryName = filteredResult[i].category.name
            let weaponRarity = filteredResult[i].rarity.id

            if(summarizedDataByWeapon.hasOwnProperty(categoryName)){
                if(summarizedDataByWeapon[categoryName].hasOwnProperty(weaponName)){
                    summarizedDataByWeapon[categoryName][weaponName].push({
                        id: filteredResult[i].id,
                        image: filteredResult[i].image,
                        skinName: filteredResult[i].name,
                        team: filteredResult[i].team.id,
                        rarity: filteredResult[i].rarity.id, 
                        price: categoryName === 'Knives' || categoryName === 'Gloves' ? Math.round((Math.random()*8 + 2))*50 : weaponPricing[categoryName][weaponRarity],   
                    })
                    if(!summarizedDataByWeapon[categoryName].availableRarities.includes(weaponRarity)){
                        summarizedDataByWeapon[categoryName].availableRarities.push(weaponRarity)
                    }
                }
                else{
                    summarizedDataByWeapon[categoryName] = {
                        ...summarizedDataByWeapon[categoryName],
                        [weaponName]: [{
                            id: filteredResult[i].id,
                            image: filteredResult[i].image,
                            skinName: filteredResult[i].name,
                            team: filteredResult[i].team.id,
                            rarity: filteredResult[i].rarity.id,
                            price: categoryName === 'Knives' || categoryName === 'Gloves' ? Math.round((Math.random()*8 + 2))*50 : weaponPricing[categoryName][weaponRarity],   
                        }]
                    }
                    if(!summarizedDataByWeapon[categoryName].availableRarities.includes(weaponRarity)){
                        summarizedDataByWeapon[categoryName].availableRarities.push(weaponRarity)
                    }
                }
            }
            else {
                summarizedDataByWeapon[categoryName] = {
                    [weaponName]: [{
                        id: filteredResult[i].id,
                        image: filteredResult[i].image,
                        skinName: filteredResult[i].name,
                        team: filteredResult[i].team.id,
                        rarity: filteredResult[i].rarity.id,
                        price: categoryName === 'Knives' || categoryName === 'Gloves' ? Math.round((Math.random()*8 + 2))*50 : weaponPricing[categoryName][weaponRarity],   
                    }],
                    availableRarities: [weaponRarity]
                }
            }

        }
        return summarizedDataByWeapon
    }
    catch(e){
        return e
    }
}

export {getAllSkins, getSkinsByRarity, getSkinImageById, getSkinByWeaponName, getSkinByTeam, getSkinByTeamGroupedByCategoryAndWeapon}