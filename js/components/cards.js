const toggleBackground = () => {
    const arrayOfCards = document.getElementsByTagName('div')
    for(let i=0; i<arrayOfCards.length; i++){
        if(arrayOfCards[i].id.endsWith('-div')){
            arrayOfCards[i].style.backgroundColor = 'white'
            if(arrayOfCards[i].id === `${localStorage.getItem('myCharacterId')}-div`){
                arrayOfCards[i].style.backgroundColor = 'lightblue'
            }
        }
    }
}

const createCardFromObject = (obj) => {
    let formattedName = obj.name.replaceAll("'","´")
    return `<div style="width: 20%; margin: 2%; aspect-ratio: 1; color: black; display: flex; flex-direction: column; justify-content: flex-end;" id='${obj.id}-div'>
    <img src=${obj.image} style="width: 80%; margin-inline: 10%; align-content: center;">
    <button id=${obj.id} style="font-size: x-small; height: 3em; width: 100%; margin: 0%;" onclick="localStorage.setItem('myCharacterId','${obj.id}');localStorage.setItem('myCharacterName','${formattedName}');document.getElementById('agentsNameInput').value = '${formattedName.substr(0,20)}';">
    ${obj.name}
    </button>
    </div>`
}

const createAllCards = (arr) => {
    let stringOfCards = ''
    for(let i=0; i<arr.length; i++){
        stringOfCards += createCardFromObject(arr[i])
    }
    return `<div style="display: flex; flex-direction: row; flex-wrap: wrap; background-color: white; margin: 2%; overflow-y: auto; aspect-ratio: 1; justify-content: space-around;">${stringOfCards}</div>`
}

export {toggleBackground, createAllCards, createCardFromObject}