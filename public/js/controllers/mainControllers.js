import * as manager from "../programs/statesandcounties.js";
import * as path from "../programs/paths.js"

const method = document.querySelector('#method')
method.addEventListener('click', async()=>{

    if(method.value == 'state'){
        const searchContainer = document.querySelector('#search-container');
        manager.showStateQuery(searchContainer);

        const selectState = document.querySelector('#select-state')
        var usStates = await fetch(path.getStates)
        const statesJson = await usStates.json()

        selectState.innerHTML = ""
        for (let i = 0; i < statesJson.features.length; i++) {
            var statesIndex = statesJson.features[i]
            manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, selectState)
        }

        document.querySelector('#select-state').addEventListener('focus', async()=>{
            await manager.loadCounties()
        })
    };
});

