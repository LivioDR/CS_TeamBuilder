import { getAvailableBalance } from "../services/validations.js"

const changeBalanceDisplay = () => {
    let balance = getAvailableBalance()
    const balanceH1 = document.getElementById('balanceH1')
    if(balance < 0){
        balanceH1.innerHTML = `Balance: <span style="color: red;">$${balance}</span>`
    }
    else{
        balanceH1.innerHTML = `Balance: $${balance}`
    }
}

const getWeaponInfoById = (category, id, allWeapons) => {
    for(const [key, val] of Object.entries(allWeapons[category])){
        const filteredValues = val.filter(skin => skin.id === id)
        if(filteredValues.length > 0){
            return filteredValues[0]
        }
    }
    return 'not found'
}

const getPayloadCards = () => {
    const currentPayload = JSON.parse(localStorage.getItem('currentPayload'))
    const weaponObject = JSON.parse(localStorage.getItem('weaponObject'))
    const categories = Object.keys(currentPayload)
    let currentBalance = 0
    
    let payloadCardsDiv = document.createElement('div')
    const payloadDivStyle = {
        'backgroundColor' : 'lightgrey',
        'width' : '100%',
        'display' : 'flex',
        'flexDirection' : 'row',
        'flexWrap' : 'wrap',
        'justifyContent' : 'space-between',
        'marginTop' : '10%',

    }
    for(const [key, val] of Object.entries(payloadDivStyle)){
        payloadCardsDiv.style[key] = val
    }

    for(let i=0; i<categories.length; i++){        
        if(currentPayload[categories[i]] !== null){
            let image = document.createElement('img')
            const categoryObject = getWeaponInfoById(categories[i], currentPayload[categories[i]],weaponObject)
            image.src = categoryObject.image
            currentBalance += categoryObject.price
            image.title = `${categoryObject.skinName}\nPrice: $${categoryObject.price}`
            image.style.width = '40%'
            payloadCardsDiv.appendChild(image)
        }
        else{
            let image = document.createElement('div')
            image.style.backgroundColor = 'grey'
            image.style.width = '40%'
            payloadCardsDiv.appendChild(image)
        }
    }
    const currentEquipmentDiv = document.getElementById('categoryDiv')
    if(currentEquipmentDiv.lastChild && currentEquipmentDiv.lastChild.textContent.trim() !== 'Gloves'){
        currentEquipmentDiv.lastChild.remove()
    }
    currentEquipmentDiv.appendChild(payloadCardsDiv)
    localStorage.setItem('currentBalance',currentBalance)
    // I change the balance display every time I select a new weapon
    changeBalanceDisplay()

}

export {changeBalanceDisplay, getPayloadCards, getWeaponInfoById}