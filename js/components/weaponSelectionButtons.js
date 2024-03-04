const toggleCategory = () => {
    const clickedCategory = localStorage.getItem('selectedCategory')
    const weaponsObject = JSON.parse(localStorage.getItem('weaponObject'))
    const weaponsTypeButtons = getWeaponTypeButtonsByCategory(weaponsObject, clickedCategory)
    document.getElementById('weaponTypeDiv').innerHTML = weaponsTypeButtons
}


const getWeponCategoryButtons = (obj) => {
    let keys = Object.keys(obj).filter(key => key != 'null')
    let buttonsHtmlString = ''
    for(let i=0; i<keys.length; i++){
        buttonsHtmlString += `<button id='${keys[i]}-category' onclick="localStorage.setItem('selectedCategory','${keys[i]}');">${keys[i]}</button>`
    }
    localStorage.setItem('weaponObject',JSON.stringify(obj))
    return [keys,buttonsHtmlString]
}

const getWeaponTypeButtonsByCategory = (obj, category) => {
    let weaponTypes = Object.keys(obj[category]).filter(key => key != 'availableRarities')
    let buttonsHtmlString = `<div id='${category}-weapons-div' style="display: flex; flex-direction: column; width: 100%;">`
    for(let i=0; i<weaponTypes.length; i++){
        buttonsHtmlString += `<button id='${weaponTypes[i]}-weaponButton'>${weaponTypes[i]}</button>`
    }
    buttonsHtmlString += `</div>`
    return buttonsHtmlString
}

export {getWeponCategoryButtons, getWeaponTypeButtonsByCategory, toggleCategory}