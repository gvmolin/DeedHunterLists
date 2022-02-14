import * as manager from "../programs/program.js";

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

