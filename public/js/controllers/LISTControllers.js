import * as manager from "../programs/program.js";
import * as path from "../programs/paths.js"

const method = document.querySelector('#method')
method.addEventListener('change', async()=>{ //<-------controller

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

        document.querySelector('#select-state').addEventListener('change', async()=>{  //<-------controller
            await manager.loadCounties()
        })

        document.querySelector('#searchbystate-button').addEventListener('click', async()=>{ //<-------controller
            try{
                const json = manager.byStateJson()
                var result =  await fetch('/getinfo')
                var result = await result.json()
                const container = document.querySelector('#result-section')  
                container.innerHTML = '' 
                
                var filtered = []
                if(json.county == 'all'){
                    filtered = manager.filterByState(result, json)
                }else{
                    filtered = manager.filterByCounty(result, json)
                }

                if(filtered.length > 0){
                    for (let i = 0; i < filtered.length; i++) {
                        var filtIndex = filtered[i]
                        manager.renderResult(filtIndex, container)
                        //console.log(filtIndex)
                    }
                }else{
                    alert('No results')
                }
                
                
                
            }
            catch(err){
                console.log(err)
            }
            

            //const infoJson = await info.json()
            
        })
    };
});


