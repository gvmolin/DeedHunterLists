import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"

window.addEventListener('load', async()=>{
    const selectState = document.querySelector('#states-select')
    const usStates = await fetch(path.getStates)
    const statesJson = await usStates.json()

    selectState.innerHTML = ""
    for (let i = 0; i < statesJson.features.length; i++) {
        var statesIndex = statesJson.features[i]
        manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, selectState)
    }
})

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    var state = document.querySelector('#states-select')
    state = state.options[state.selectedIndex].innerHTML
    const json = manager.stateJson(state)
    
    var result =  await fetch('/getinfo')
    var result = await result.json()
    const container = document.querySelector('tbody')  
    container.innerHTML = '' 
    var filtered = []
    filtered = manager.filterByState(result, json)
    console.log(filtered)
    if(filtered.length > 0){
        for (let i = 0; i < filtered.length; i++) {
            var filtIndex = filtered[i]
            manager.renderResult(filtIndex, container)
            //console.log(filtIndex)
        }
    }else{
        alert('No results')
    }
})


