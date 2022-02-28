import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"

const selectState = document.querySelector('#select-states-map')
window.addEventListener('load', async () => {
    const usStates = await fetch(path.getStates)
    const statesJson = await usStates.json()
    const arr = new Array()

    selectState.innerHTML = ""

    for (let i = 0; i < statesJson.features.length; i++) {
        var statesIndex = statesJson.features[i]
        //console.log(statesIndex)
        arr.push([statesIndex.properties.NAME, statesIndex.properties.STATE]);
    }
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
        var arrIndex = arr[i]
        manager.createOption(arrIndex[0], arrIndex[1], selectState)
    }
})

selectState.addEventListener('change', async () => {
    const state = selectState.options[selectState.selectedIndex]
    const json = manager.stateJson(state.innerHTML, state.value)

    const result = await manager.postData(json, '/statesInfoForSelect')
    const resultCounties = await manager.postData(json, '/getCounties')

    const listJson = manager.listJson(state.innerHTML, 'All', 'All')//json with state name
    const lists = await manager.postData(listJson, '/searchLists')//all lists info
    var filtered = []
    var filtered = await manager.filterByState(lists, listJson)//only the state lists

    infoContainer.innerHTML = ''
    manager.renderStateInfo(result, infoContainer, resultCounties, filtered)
})


const states = document.querySelectorAll('path')//All SVG paths
const infoContainer = document.querySelector('#result')
for (let i = 0; i < states.length; i++) {
    const stateIndex = states[i]
    const stateName = stateIndex.id//RESULT IN abbreviation, ex: TX, AZ, NY
    stateIndex.addEventListener('click', async () => {
        const json = manager.stateJson(stateName, '1')//Abbreviation
        const result = await manager.postData(json, '/statesInfo')//Get gen info

        const anotherJson = manager.stateJson(result.state, 'undefined')//json with the state name
        const counties = await manager.postData(anotherJson, '/getCountiesByStateName')//get counties list

        const listJson = manager.listJson(result.state, 'All', 'All')//json with state name
        const lists = await manager.postData(listJson, '/searchLists')//all lists info
        var filtered = []
        var filtered = await manager.filterByState(lists, listJson)//only the state lists

        infoContainer.innerHTML = ''
        manager.renderStateInfo(result, infoContainer, counties, filtered)//render on screen
    })
}




