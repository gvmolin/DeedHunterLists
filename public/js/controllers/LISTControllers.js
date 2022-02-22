import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"
const selectState = document.querySelector('#states-select')

window.addEventListener('load', async()=>{    
    const usStates = await fetch(path.getStates)
    const statesJson = await usStates.json()

    const arr = new Array()
    for (let i = 0; i < statesJson.features.length; i++) {
    }

    selectState.innerHTML = ""
    manager.createOption('Todos', 'All', selectState)

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

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    var state = document.querySelector('#states-select')
    const stateValue = state.value
    state = state.options[state.selectedIndex].innerHTML
    const list = document.querySelector('#list-select').value
    const otc = document.querySelector('#otc-select').value

    const json = manager.listJson(state, list, otc)
    console.log(json)
    
    //var result =  await fetch('/getinfo')
    var result = await manager.postData(json, path.search)
    
    const container = document.querySelector('tbody')  
    container.innerHTML = '' 
    var filtered = []
    if(stateValue == 'All'){
        filtered = result
    }else{
        filtered = manager.filterByState(result, json)
    }
    
    console.log(filtered)
    if(filtered.length > 0){
        for (let i = 0; i < filtered.length; i++) {
            var filtIndex = filtered[i]
            if(filtIndex.state !== null){
                manager.renderResult(filtIndex, container)
            }else{

            }
            
            //console.log(filtIndex)
        }
    }else{
        alert('No results')
    }
})


