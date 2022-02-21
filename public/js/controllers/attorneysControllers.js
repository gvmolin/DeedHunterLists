import * as path  from '../programs/paths.js' 
import * as program from '../programs/program.js'

window.addEventListener('load', async()=>{
    const attorneys = await fetch(path.attorneys)
    const attorneysJson = await attorneys.json()
    const container = document.querySelector('main')
    
    for(let i = 0; i < attorneysJson.length; i++){
        var index = attorneysJson[i]
        program.renderAttorneyItem(index, container)
    }
})