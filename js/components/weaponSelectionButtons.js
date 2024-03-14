import { agentsPayloadValidation } from "../services/validations.js"

const toggleCategory = () => {
    const clickedCategory = localStorage.getItem('selectedCategory')
    const weaponsObject = JSON.parse(localStorage.getItem('weaponObject'))
    const weaponsTypeButtons = getWeaponTypeButtonsByCategory(weaponsObject, clickedCategory)
    document.getElementById('weaponTypeDiv').innerHTML = weaponsTypeButtons

    const allWeaponButtons = document.getElementsByTagName('button')
    for(let i=0; i<allWeaponButtons.length; i++){
        if(allWeaponButtons[i].id.endsWith('-weaponButton')){
            allWeaponButtons[i].addEventListener('click',() => {
                let clickedWeapon = `${allWeaponButtons[i].id.split('-weaponButton')[0]}`
                localStorage.setItem('selectedWeapon',clickedWeapon)
                const skinsTypeButtons = getSkinTypeButtonsByWeapon(weaponsObject, clickedWeapon)
                document.getElementById('skinTypeDiv').innerHTML = skinsTypeButtons

                const allSkinButtons = document.getElementsByClassName('skinButton')
                for(let i=0; i<allSkinButtons.length; i++){
                    allSkinButtons[i].addEventListener('click',agentsPayloadValidation)
                }
                })
            }
        }
    }

const getWeponCategoryButtons = (obj) => {
    let keys = Object.keys(obj).filter(key => key != 'null')
    let buttonsHtmlString = ''
    for(let i=0; i<keys.length; i++){
        buttonsHtmlString += 
            `<button id='${keys[i]}-category' onclick="localStorage.setItem('selectedCategory','${keys[i]}');">
                ${keys[i]}
            </button>`
    }
    return [keys,buttonsHtmlString]
}

const getWeaponTypeButtonsByCategory = (obj, category) => {
    let weaponTypes = Object.keys(obj[category]).filter(key => key != 'availableRarities')
    let buttonsHtmlString = `<div id='${category}-weapons-div' style="display: flex; flex-direction: column; width: 100%;">`
    for(let i=0; i<weaponTypes.length; i++){
        buttonsHtmlString += `<button id='${weaponTypes[i]}-weaponButton'">${weaponTypes[i]}</button>`
    }
    buttonsHtmlString += `</div>`
    return buttonsHtmlString
}

const getSkinTypeButtonsByWeapon = (obj, weaponName) => {
    const category = localStorage.getItem("selectedCategory")
    const skinsArray = obj[category][weaponName]
    let skinCards = skinsArray.map(element => {
        return `<div id='${element.id}' style="width: 28%; align-text: center; background-color: grey; margin: 2%; aspect-ratio: 1;">
                    <img src='${element.image}' style="width: 100%; margin: 0%; padding: 0%;">
                    <button class="skinButton" id='${element.id}-button' onclick="localStorage.setItem('selectedSkin-${category}','${element.id}');" style="margin-bottom: 0%;">
                        <div style="display: flex; flex-direction: row; flex-wrap: wrap;justify-content: space-between;">
                            <p style="color: black; width: 100%; font-size: small; text-align: center; margin: 0%;">${element.skinName}<br>$${element.price}</p>
                        </div>
                    </button>
                </div>`
    });
    skinCards = skinCards.join('')
    return skinCards
}

export {getWeponCategoryButtons, getWeaponTypeButtonsByCategory, getSkinTypeButtonsByWeapon, toggleCategory}