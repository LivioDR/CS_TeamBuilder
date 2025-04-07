import { API_ENDPOINTS } from "../config/endpoints.js"
import weaponPricing from "../utilities/weaponPricing.js"

// Returns an object organized by {category: weaponType : [...skins]} for the skins that are valid for the team passed as an argument (being that team weapons and weapons that are available for both teams)
const getSkinByTeamGroupedByCategoryAndWeapon = async(team) => {
    try{
        // getting all the skins from the CS-GO API
        let result = await fetch(API_ENDPOINTS.SKINS).then(res => res.json())
        // then I filter out the skins that are not available for the team received as an argument
        let filteredResult = result.filter(item => ((item.team.id === team || item.team.id === 'both') && item.category.name !== 'Equipment'))
        // I create an empty object that will store the new data structure with the skins information
        let summarizedDataByWeapon = {}

        // After getting rid of the non-compatible weapons, I go through the array of skins and reorganize the data into my new object
        for(let i=0; i<filteredResult.length; i++){
            // I get the category and weapon type for every weapon, since I'll be using this data to organize every skin into the custom object
            // The rarity will be used to set the pricing of every skin later on
            let weaponName = filteredResult[i].weapon.name
            let categoryName = filteredResult[i].category.name
            let weaponRarity = filteredResult[i].rarity.id

            // If I have already added a weapon for this category, I need to make sure to preserve that data while adding this new weapon
            if(summarizedDataByWeapon.hasOwnProperty(categoryName)){
                // Same if I have already added a skin for this type of weapon
                if(summarizedDataByWeapon[categoryName].hasOwnProperty(weaponName)){
                    summarizedDataByWeapon[categoryName][weaponName].push({
                        id: filteredResult[i].id,
                        image: filteredResult[i].image,
                        skinName: filteredResult[i].name,
                        team: filteredResult[i].team.id,
                        rarity: filteredResult[i].rarity.id, 
                        // I set now the price for this skin, based on the weaponPricing object from my utilities folder. For knives and gloves I calculate the price in here in order to use a new seed for the random function and not get the same value always
                        price: categoryName === 'Knives' || categoryName === 'Gloves' ? Math.round((Math.random()*8 + 2))*50 : weaponPricing[categoryName][weaponRarity],   
                    })
                    // if the rarity was not included in this object for this category and type of weapon combination, I add it to the object to use it later
                    if(!summarizedDataByWeapon[categoryName].availableRarities.includes(weaponRarity)){
                        summarizedDataByWeapon[categoryName].availableRarities.push(weaponRarity)
                    }
                }
                else{
                    // otherwise if there were already weapon types for this category, but no skins for this weapon type, I preserve the previous weapon types by assigning to my custom object the spreaded values of the previous weapon types and the new weapon type
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
                // in case that there were no weapons for the selected category, I just include this new category into the object, along with the weapon type and the first skin for it
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

export {getSkinByTeamGroupedByCategoryAndWeapon}