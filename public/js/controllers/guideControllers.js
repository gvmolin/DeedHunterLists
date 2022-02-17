import * as path  from '../programs/paths.js' 
import * as program from '../programs/program.js'

window.addEventListener('load', async()=>{
    const guide = await fetch(path.getGuide)
    const guideJson = await guide.json()
    console.log(guideJson)
    const container = document.querySelector('main')
    
    for(let i = 0; i < guideJson.length; i++){
        var index = guideJson[i]
        program.renderGuideItem(index, container)
    }
})