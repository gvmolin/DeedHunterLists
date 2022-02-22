import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"

const selectState = document.querySelector('#select-states-map')
window.addEventListener('load', async()=>{
    const usStates = await fetch(path.getStates)
    const statesJson = await usStates.json()

    const arr = new Array()
    for (let i = 0; i < statesJson.features.length; i++) {
    }

    selectState.innerHTML = ""
    //manager.createOption('Todos', 'All', selectState)

    for (let i = 0; i < statesJson.features.length; i++) {
        var statesIndex = statesJson.features[i]
        arr.push(statesIndex.properties.NAME); 
        //manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, selectState)
    }

    arr.sort();
    for (let i = 0; i < arr.length; i++) {
        var arrIndex = arr[i]
        manager.createOption(arrIndex, '1', selectState)
    }
})

selectState.addEventListener('change', async()=>{
    const state = selectState.options[selectState.selectedIndex].innerHTML
    const json = manager.stateJson(state)
    console.log(json)
    const result = await manager.postData(json, '/statesInfoForSelect')
       
    infoContainer.innerHTML = ''
    manager.renderStateInfo(result, infoContainer)
})


const states = document.querySelectorAll('path')
const infoContainer = document.querySelector('#result')
for (let i = 0; i < states.length; i++){
    const stateIndex = states[i]
    const stateName = stateIndex.id
    stateIndex.addEventListener('click', async()=>{
        const json = manager.stateJson(stateName)
        const result = await manager.postData(json, '/statesInfo')
       
        infoContainer.innerHTML = ''
        manager.renderStateInfo(result, infoContainer)
        alert(stateName)
    })
}




